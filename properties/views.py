from rest_framework import viewsets
from realestate.permissions import IsAgentOrReadOnly
from .models import Property
from .serializers import PropertySerializer


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAgentOrReadOnly]
