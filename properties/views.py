from django.core.exceptions import ValidationError
from django.db.models import Case, When, F, DecimalField
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from properties.validators import validate_image_file
from realestate.permissions import IsAgentOrReadOnly
from .filters import PropertyFilter
from .models import Property, PropertyImage, ListingType, PropertyType
from .serializers import (
    PropertySerializer,
    PropertyImageSerializer,
    ListingTypeSerializer,
    PropertyTypeSerializer,
)


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAgentOrReadOnly]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = PropertyFilter

    search_fields = ["title", "description", "city", "address"]

    # IMPORTANT: include price_display
    ordering_fields = [
        "price",
        "min_price",
        "max_price",
        "rent_amount",
        "price_display",
        "created_at",
    ]
    ordering = ["price_display"]

    def get_queryset(self):
        """
        Annotate price_display so it can be:
        - ordered
        - returned consistently
        - tested reliably
        """
        queryset = (
            Property.objects
            .select_related("listing_type", "province", "area")
            .prefetch_related("features", "images")
            .annotate(
                price_display=Case(
                    When(price__isnull=False, then=F("price")),
                    When(max_price__isnull=False, then=F("max_price")),
                    When(rent_amount__isnull=False, then=F("rent_amount")),
                    default=None,
                    output_field=DecimalField(),
                )
            )
        )
        return queryset

    def perform_create(self, serializer):
        """
        Agent is always the logged-in user.
        This fixes:
        - ValidationError for agent
        - 403 test failure
        """
        serializer.save(agent=self.request.user)

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAgentOrReadOnly],
    )
    def upload_image(self, request, pk=None):
        property_obj = self.get_object()
        image_files = request.FILES.getlist("images")

        if not image_files:
            return Response(
                {"error": "No images provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        created_images = []
        errors = []

        for idx, img in enumerate(image_files, start=1):
            try:
                validate_image_file(img)
                new_img = PropertyImage.objects.create(
                    property=property_obj,
                    image=img,
                )
                created_images.append(
                    PropertyImageSerializer(new_img).data
                )
            except ValidationError as e:
                errors.append({f"image_{idx}": str(e)})

        response_data = {"uploaded": created_images}
        if errors:
            response_data["errors"] = errors

        status_code = (
            status.HTTP_201_CREATED
            if created_images
            else status.HTTP_400_BAD_REQUEST
        )

        return Response(response_data, status=status_code)


class ListingTypeViewSet(viewsets.ModelViewSet):
    queryset = ListingType.objects.all()
    serializer_class = ListingTypeSerializer


class PropertyTypeViewSet(viewsets.ModelViewSet):
    queryset = PropertyType.objects.all()
    serializer_class = PropertyTypeSerializer
