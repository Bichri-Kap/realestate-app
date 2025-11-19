from rest_framework import serializers
from .models import Booking
from properties.serializers import PropertySerializer
from accounts.serializers import UserSerializer


class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    property = PropertySerializer(read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
