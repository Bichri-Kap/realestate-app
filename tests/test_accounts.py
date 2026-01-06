import pytest


@pytest.mark.django_db
def test_user_profile_access(api_client, create_user, get_token):
    user = create_user(username="testuser")
    token = get_token(user)
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    response = api_client.get("/api/users/")
    assert response.status_code == 200


@pytest.mark.django_db
def test_user_permissions(create_user, create_admin, auth_client):
    user1 = create_user(username="user1")
    user2 = create_user(username="user2")
    admin = create_admin()

    client = auth_client(user1)
    # user can view own profile
    response = client.get(f"/api/users/{user1.id}/")
    assert response.status_code == 200

    # user cannot view other profile
    response = client.get(f"/api/users/{user2.id}/")
    assert response.status_code == 403

    # admin can view any profile
    client = auth_client(admin)
    response = client.get(f"/api/users/{user2.id}/")
    assert response.status_code == 200
