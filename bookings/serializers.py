from rest_framework import serializers
from .models import Booking
from properties.serializers import PropertySerializer
from accounts.serializers import UserSerializer


class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    property = PropertySerializer(read_only=True)
    property_id = serializers.PrimaryKeyRelatedField(
        queryset=Booking.objects.model.property.field.related_model.objects.all(),
        write_only=True,
        source='property'
    )

    class Meta:
        model = Booking
        fields = ['id', 'user', 'property', 'property_id', 'date', 'time', 'message', 'created_at', 'status']
        read_only_fields = ['status', 'created_at']
