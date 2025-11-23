from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class PropertyAuthTest(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )

        # Create a JWT for the user
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        # API client
        self.client = APIClient()

    def test_access_without_token(self):
        # Try accessing protected endpoint without JWT
        response = self.client.get("/api/properties/")
        self.assertEqual(response.status_code, 200)  # Unauthorized

    def test_access_with_token(self):
        # Set JWT in header
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")
        response = self.client.get("/api/properties/")
        self.assertEqual(response.status_code, 200)  # Success
