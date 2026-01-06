import pytest
from reviews.models import PropertyReview


@pytest.mark.django_db
def test_review_list(auth_client, create_user, sample_property):
    user = create_user(username="testuser")
    client = auth_client(user)

    PropertyReview.objects.create(
        user=user,
        property=sample_property,
        rating=5,
        comment="Great!"
    )

    response = client.get("/api/reviews/")
    assert response.status_code == 200
    assert len(response.data) >= 1
