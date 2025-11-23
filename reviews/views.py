from rest_framework import viewsets
from .models import PropertyReview
from .serializers import PropertyReviewSerializer
from realestate.permissions import IsReviewOwnerOrAdmin


class PropertyReviewViewSet(viewsets.ModelViewSet):
    queryset = PropertyReview.objects.all()
    serializer_class = PropertyReviewSerializer
    permission_classes = [IsReviewOwnerOrAdmin]
