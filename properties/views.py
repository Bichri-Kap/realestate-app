from django.core.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from properties.validators import validate_image_file
from realestate.permissions import IsAgentOrReadOnly
from .models import Property, PropertyImage, ListingType, PropertyType
from .serializers import PropertySerializer, PropertyImageSerializer, ListingTypeSerializer, PropertyTypeSerializer


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAgentOrReadOnly]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = [
        "listing_type",
        "property_type",
        "min_price",
        "max_price",
        "rent_amount",
        "bedrooms",
        "bathrooms",
        "parking",
        "floor_size",
        "erf_size",
        "features",
        "status",
        "availability_status",
        "repossessed",
        "estate",
        "cluster",
        "retirement",
        "on_auction",
        "agent",
        "province",
        "area",
    ]

    search_fields = ["title", "description", "city", "address"]
    ordering_fields = ["price", "min_price", "max_price", "rent_amount", "created_at"]
    ordering = ["-created_at"]

    @action(detail=True, methods=["post"], permission_classes=[IsAgentOrReadOnly])
    def upload_image(self, request, pk=None):
        property_obj = self.get_object()
        image_files = request.FILES.getlist("images")

        if not image_files:
            return Response({"error": "No images provided."}, status=status.HTTP_400_BAD_REQUEST)

        created_images = []
        errors = []

        for idx, img in enumerate(image_files, start=1):
            try:
                validate_image_file(img)
                new_img = PropertyImage.objects.create(property=property_obj, image=img)
                created_images.append(PropertyImageSerializer(new_img).data)
            except ValidationError as e:
                errors.append({f"image_{idx}": str(e)})

        response_data = {"uploaded": created_images}
        if errors:
            response_data["errors"] = errors

        status_code = status.HTTP_201_CREATED if created_images else status.HTTP_400_BAD_REQUEST
        return Response(response_data, status=status_code)

    def perform_create(self, serializer):
        serializer.save(agent=self.request.user)


class ListingTypeViewSet(viewsets.ModelViewSet):
    queryset = ListingType.objects.all()
    serializer_class = ListingTypeSerializer


class PropertyTypeViewSet(viewsets.ModelViewSet):
    queryset = PropertyType.objects.all()
    serializer_class = PropertyTypeSerializer
