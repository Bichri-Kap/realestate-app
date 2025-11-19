from rest_framework import viewsets
from .models import PropertyReview
from .serializers import PropertyReviewSerializer


class PropertyReviewViewSet(viewsets.ModelViewSet):
    queryset = PropertyReview.objects.all()
    serializer_class = PropertyReviewSerializer
