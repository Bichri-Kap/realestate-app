from rest_framework import viewsets
from realestate.permissions import IsOwnerOrAdmin
from .models import Booking
from .serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsOwnerOrAdmin]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
