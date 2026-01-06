import uuid
from django.contrib.auth import get_user_model
from properties.models import Property, Province, Area, ListingType

User = get_user_model()


def create_user(**overrides):
    defaults = {
        "username": f"user_{uuid.uuid4().hex[:6]}",
        "email": "user@example.com",
        "password": "password123",
    }
    defaults.update(overrides)
    return User.objects.create_user(**defaults)


def create_property(**overrides):
    province = overrides.pop("province", Province.objects.create(name="Lusaka"))
    area = overrides.pop("area", Area.objects.create(name="Kabulonga", province=province))
    agent = overrides.pop("agent", create_user(is_staff=True))
    listing_type = overrides.pop(
        "listing_type", ListingType.objects.create(name="For Sale", slug="sale")
    )

    defaults = {
        "title": "Test Property",
        "description": "Nice property",
        "city": "Lusaka",
        "province": province,
        "area": area,
        "agent": agent,
        "listing_type": listing_type,
        "min_price": 100000,
        "max_price": 500000,
    }

    defaults.update(overrides)

    prop = Property.objects.create(**defaults)
    prop.refresh_from_db()
    return prop
