from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class AccountsTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )
        refresh = RefreshToken.for_user(self.user)
        self.client = APIClient()
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {str(refresh.access_token)}"
        )

    def test_user_profile_access(self):
        response = self.client.get("/api/users/")
        self.assertEqual(response.status_code, 200)


class UserPermissionsTest(APITestCase):
    def setUp(self):
        # Create regular user
        self.user = User.objects.create_user(username="user1", password="pass123")
        # Create another user
        self.user2 = User.objects.create_user(username="user2", password="pass123")
        # Create admin user
        self.admin = User.objects.create_superuser(
            username="admin", password="admin123"
        )

        self.client = APIClient()

        # Tokens
        self.user_token = str(RefreshToken.for_user(self.user).access_token)
        self.user2_token = str(RefreshToken.for_user(self.user2).access_token)
        self.admin_token = str(RefreshToken.for_user(self.admin).access_token)

    def test_user_can_view_own_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user_token}")
        response = self.client.get(f"/api/users/{self.user.id}/")
        self.assertEqual(response.status_code, 200)

    def test_user_cannot_view_other_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user_token}")
        response = self.client.get(f"/api/users/{self.user2.id}/")
        self.assertEqual(response.status_code, 403)

    def test_admin_can_view_any_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.admin_token}")
        response = self.client.get(f"/api/users/{self.user2.id}/")
        self.assertEqual(response.status_code, 200)
