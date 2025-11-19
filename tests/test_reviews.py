from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from reviews.models import PropertyReview
from properties.models import Property

User = get_user_model()


class ReviewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        refresh = RefreshToken.for_user(self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {str(refresh.access_token)}")

        self.property = Property.objects.create(title="Sample Property", description="Nice", price=50000)
        self.review = PropertyReview.objects.create(user=self.user, property=self.property, rating=5, comment="Great!")

    def test_review_list(self):
        response = self.client.get("/api/reviews/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) >= 1)
