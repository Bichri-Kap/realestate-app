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


class PropertyPermissionsTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="user1", password="pass123")
        self.agent = User.objects.create_user(username="agent", password="pass123", is_agent=True)
        self.client = APIClient()

        self.agent_token = str(RefreshToken.for_user(self.agent).access_token)
        self.user_token = str(RefreshToken.for_user(self.user).access_token)

        # Sample property
        self.property = Property.objects.create(title="Test House", description="Nice", price=100000, agent=self.agent)

    def test_public_can_list_properties(self):
        response = self.client.get("/api/properties/")
        self.assertEqual(response.status_code, 200)

    def test_agent_can_create_property(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.agent_token}")
        data = {"title": "New House", "description": "Nice", "price": 200000, "agent": self.agent.id}
        response = self.client.post("/api/properties/", data)
        self.assertEqual(response.status_code, 201)

    def test_regular_user_cannot_create_property(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user_token}")
        data = {"title": "User House", "description": "Nope", "price": 50000, "agent": self.user.id}
        response = self.client.post("/api/properties/", data)
        self.assertEqual(response.status_code, 403)


class PropertySearchOrderingPaginationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="agent",
            password="pass123",
            is_agent=True
        )
        self.client.force_authenticate(self.user)

        Property.objects.create(title="Luxury House", price=500000, city="Lusaka")
        Property.objects.create(title="Affordable Apartment", price=150000, city="Kitwe")
        Property.objects.create(title="Modern Condo", price=300000, city="Lusaka")

    def test_search(self):
        response = self.client.get("/api/properties/?search=luxury")
        self.assertEqual(len(response.data["results"]), 1)

    def test_ordering(self):
        response = self.client.get("/api/properties/?ordering=price")
        prices = [item["price"] for item in response.data["results"]]
        self.assertEqual(prices, sorted(prices))

    def test_pagination(self):
        response = self.client.get("/api/properties/")
        self.assertIn("results", response.data)
        self.assertTrue(len(response.data["results"]) <= 10)
