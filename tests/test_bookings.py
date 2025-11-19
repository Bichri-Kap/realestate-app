from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from bookings.models import Booking
from properties.models import Property
from datetime import date, time

User = get_user_model()


class BookingTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.client = APIClient()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {str(refresh.access_token)}")

        self.property = Property.objects.create(title="Sample Property", description="Nice", price=50000)
        self.booking = Booking.objects.create(
            user=self.user, property=self.property, date=date.today(), time=time(hour=14, minute=0))

    def test_booking_list(self):
        response = self.client.get("/api/bookings/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) >= 1)
