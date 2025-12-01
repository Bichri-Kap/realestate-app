from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from bookings.models import Booking
from properties.models import Property, ListingType
from datetime import date, time

User = get_user_model()


class BookingTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )
        self.client = APIClient()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {str(refresh.access_token)}"
        )

        self.listing_type = ListingType.objects.create(name="For Sale")

        self.property = Property.objects.create(
            title="Sample Property",
            description="Nice",
            min_price=50000,
            listing_type=self.listing_type
        )
        self.booking = Booking.objects.create(
            user=self.user,
            property=self.property,
            date=date.today(),
            time=time(hour=14, minute=0),
        )

    def test_booking_list(self):
        response = self.client.get("/api/bookings/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) >= 1)


class BookingPermissionsTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="user1", password="pass123")
        self.user2 = User.objects.create_user(username="user2", password="pass123")
        self.admin = User.objects.create_superuser(
            username="admin", password="admin123"
        )
        self.client = APIClient()

        self.user_token = str(RefreshToken.for_user(self.user).access_token)
        self.admin_token = str(RefreshToken.for_user(self.admin).access_token)

        self.listing_type = ListingType.objects.create(name="For Sale")

        self.property = Property.objects.create(
            title="House",
            description="Nice",
            min_price=100000,
            agent=self.user,
            listing_type=self.listing_type
        )

        self.booking = Booking.objects.create(
            user=self.user, property=self.property, date=date.today(), time=time(10, 0)
        )

    def test_user_can_view_own_booking(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user_token}")
        response = self.client.get(f"/api/bookings/{self.booking.id}/")
        self.assertEqual(response.status_code, 200)

    def test_user_cannot_view_others_booking(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user_token}")
        booking2 = Booking.objects.create(
            user=self.user2, property=self.property, date=date.today(), time=time(11, 0)
        )
        response = self.client.get(f"/api/bookings/{booking2.id}/")
        self.assertEqual(response.status_code, 403)

    def test_admin_can_view_any_booking(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.admin_token}")
        response = self.client.get(f"/api/bookings/{self.booking.id}/")
        self.assertEqual(response.status_code, 200)

    def test_user_can_create_booking(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user_token}")
        data = {
            "property_id": self.property.id,
            "date": "2025-12-01",
            "time": "14:00:00",
            "message": "I am interested in this property"
        }
        response = self.client.post("/api/bookings/", data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["user"]["id"], self.user.id)
        self.assertEqual(response.data["property"]["id"], self.property.id)

    def test_agent_can_list_bookings_for_their_property(self):
        agent = self.property.agent
        refresh = RefreshToken.for_user(agent)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {str(refresh.access_token)}")
        response = self.client.get("/api/bookings/?property_id=" + str(self.property.id))
        self.assertEqual(response.status_code, 200)
