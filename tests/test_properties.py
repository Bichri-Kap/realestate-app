from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from properties.models import Property

User = get_user_model()


class PropertyTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

        # Sample property
        self.property = Property.objects.create(
            title="Test Property",
            description="Nice property",
            price=100000
        )

    def test_property_list(self):
        response = self.client.get("/api/properties/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) >= 1)

    def test_property_detail(self):
        response = self.client.get(f"/api/properties/{self.property.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], "Test Property")
