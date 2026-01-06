import pytest
import uuid
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from properties.models import Property, ListingType, Province, Area

User = get_user_model()

# -------------------------------------------------------------------
# USERS
# -------------------------------------------------------------------


@pytest.fixture
def create_user(db):
    def _create_user(**kwargs):
        defaults = {
            "username": f"user_{uuid.uuid4().hex[:6]}",
            "email": "user@test.com",
            "password": "pass1234",
        }
        defaults.update(kwargs)
        user = User.objects.create_user(**defaults)
        return user

    return _create_user


@pytest.fixture
def create_admin(db):
    def _create_admin(**kwargs):
        defaults = {
            "username": f"admin_{uuid.uuid4().hex[:6]}",
            "email": "admin@test.com",
            "password": "admin123",
            "is_staff": True,
            "is_superuser": True,
        }
        defaults.update(kwargs)
        admin = User.objects.create_superuser(**defaults)
        return admin

    return _create_admin


@pytest.fixture
def agent_user(db, create_user):
    return create_user(username="agent_user", is_staff=True)


@pytest.fixture
def user(create_user):
    return create_user()


@pytest.fixture
def admin_user(create_admin):
    return create_admin()


# -------------------------------------------------------------------
# AUTH / CLIENTS (JWT)
# -------------------------------------------------------------------


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def get_token():
    def _get_token(user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    return _get_token


@pytest.fixture
def auth_client(api_client):
    def _auth_client(user):
        refresh = RefreshToken.for_user(user)
        api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
        return api_client

    return _auth_client


@pytest.fixture
def agent_client(api_client, agent_user):
    refresh = RefreshToken.for_user(agent_user)
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
    return api_client


@pytest.fixture
def admin_client(api_client, admin_user):
    refresh = RefreshToken.for_user(admin_user)
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
    return api_client


# -------------------------------------------------------------------
# LOOKUPS
# -------------------------------------------------------------------


@pytest.fixture
def listing_type_sale(db):
    return ListingType.objects.create(name="For Sale", slug="sale")


@pytest.fixture
def listing_type_rent(db):
    return ListingType.objects.create(name="For Rent", slug="rent")


@pytest.fixture
def province(db):
    return Province.objects.create(name="Lusaka")


@pytest.fixture
def area(db, province):
    return Area.objects.create(name="Kabulonga", province=province)


# -------------------------------------------------------------------
# PROPERTY FACTORIES
# -------------------------------------------------------------------


@pytest.fixture
def create_property(db, listing_type_sale, province, area, agent_user):
    def _create_property(**kwargs):
        defaults = {
            "title": "Test Property",
            "description": "Nice place",
            "listing_type": listing_type_sale,
            "province": province,
            "city": province.name,
            "area": area,
            "agent": agent_user,
            "min_price": 100000,
            "max_price": 500000,
        }
        defaults.update(kwargs)

        prop = Property.objects.create(**defaults)
        prop.refresh_from_db()
        return prop

    return _create_property


@pytest.fixture
def sample_property(create_property):
    return create_property(title="Sample Property")
