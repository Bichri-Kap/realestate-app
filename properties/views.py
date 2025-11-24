from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from realestate.permissions import IsAgentOrReadOnly
from .models import Property, PropertyImage
from .serializers import PropertySerializer, PropertyImageSerializer


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAgentOrReadOnly]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    filterset_fields = ['price', 'status', 'bedrooms', 'bathrooms', 'agent']
    search_fields = ['title', 'description', "city", 'address']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']

    @action(detail=True, methods=["post"], permission_classes=[IsAgentOrReadOnly])
    def upload_image(self, request, pk=None):
        property_obj = self.get_object()

        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"error": "No image provided."}, status=400)

        new_img = PropertyImage.objects.create(property=property_obj, image=image_file)

        return Response(PropertyImageSerializer(new_img).data, status=201)
