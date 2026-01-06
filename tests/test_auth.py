import pytest


@pytest.mark.django_db
def test_access_without_token(api_client):
    response = api_client.get("/api/properties/")
    assert response.status_code == 200  # or 401 if you have JWT auth enforced


@pytest.mark.django_db
def test_access_with_token(create_user, auth_client):
    user = create_user(username="testuser")
    client = auth_client(user)
    response = client.get("/api/properties/")
    assert response.status_code == 200
