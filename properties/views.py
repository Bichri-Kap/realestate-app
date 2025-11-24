from django.core.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from properties.validators import validate_image_file
from realestate.permissions import IsAgentOrReadOnly

from .models import Property, PropertyImage
from .serializers import PropertyImageSerializer, PropertySerializer


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAgentOrReadOnly]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = ["price", "status", "bedrooms", "bathrooms", "agent"]
    search_fields = ["title", "description", "city", "address"]
    ordering_fields = ["price", "created_at"]
    ordering = ["-created_at"]

    @action(detail=True, methods=["post"], permission_classes=[IsAgentOrReadOnly])
    def upload_image(self, request, pk=None):
        property_obj = self.get_object()

        image_files = request.FILES.getlist("images")

        if not image_files:
            return Response(
                {"error": "No images provided."}, status=status.HTTP_400_BAD_REQUEST
            )

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

        status_code = (
            status.HTTP_201_CREATED if created_images else status.HTTP_400_BAD_REQUEST
        )
        return Response(response_data, status=status_code)

    def perform_create(self, serializer):
        """
        Set the `agent` field to the currently authenticated user when creating
        a new `Property` instance.

        This overrides DRF's `perform_create` hook on `ModelViewSet` so that
        clients do not supply the `agent` value directly. The view's
        `permission_classes` (for example, `IsAgentOrReadOnly`) should ensure
        only authorized users (agents) can create properties.

        Args:
            serializer: The serializer instance being saved for the Property.
        """
        serializer.save(agent=self.request.user)
