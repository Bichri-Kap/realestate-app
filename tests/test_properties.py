import pytest
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

from properties.models import Property


# -------------------------------------------------------------------
# PROPERTY API TESTS
# -------------------------------------------------------------------

@pytest.mark.django_db
def test_property_list(api_client, create_property):
    create_property()

    response = api_client.get("/api/properties/")
    assert response.status_code == 200
    assert len(response.data["results"]) >= 1


@pytest.mark.django_db
def test_property_detail(api_client, create_property):
    prop = create_property(title="Test Property")

    response = api_client.get(f"/api/properties/{prop.id}/")
    assert response.status_code == 200
    assert response.data["title"] == "Test Property"


# -------------------------------------------------------------------
# PERMISSIONS
# -------------------------------------------------------------------

@pytest.mark.django_db
def test_public_can_list_properties(api_client):
    response = api_client.get("/api/properties/")
    assert response.status_code == 200


@pytest.mark.django_db
def test_agent_can_create_property(
    agent_client,
    listing_type_sale,
    province,
    area,
):
    data = {
        "title": "New House",
        "description": "Nice",
        "listing_type_id": listing_type_sale.id,
        "province_id": province.id,
        "city": "Lusaka",
        "area_id": area.id,
        "min_price": 200000,
        "max_price": 400000,
    }

    response = agent_client.post("/api/properties/", data, format="json")
    print(response.status_code)
    print(response.data)
    assert response.status_code == 201


@pytest.mark.django_db
def test_regular_user_cannot_create_property(
    api_client,
    user,
    listing_type_sale,
    province,
    area,
):
    token = RefreshToken.for_user(user).access_token
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    data = {
        "title": "User House",
        "description": "Nope",
        "listing_type": listing_type_sale.id,
        "province": province.id,
        "city": "Lusaka",
        "area": area.id,
        "min_price": 50000,
    }

    response = api_client.post("/api/properties/", data)
    assert response.status_code == 403


# -------------------------------------------------------------------
# SEARCH, ORDERING, PAGINATION
# -------------------------------------------------------------------

@pytest.mark.django_db
def test_search(api_client, create_property):
    create_property(title="Luxury House")
    create_property(title="Affordable Apartment")

    response = api_client.get("/api/properties/?search=luxury")
    assert len(response.data["results"]) == 1


@pytest.mark.django_db
def test_ordering(api_client, create_property):
    create_property(max_price=500000)
    create_property(max_price=150000)
    create_property(max_price=300000)

    response = api_client.get("/api/properties/?ordering=price_display")
    prices = [item["price_display"] for item in response.data["results"]]

    assert prices == sorted(prices)


@pytest.mark.django_db
def test_pagination(api_client, create_property):
    for _ in range(12):
        create_property()

    response = api_client.get("/api/properties/")
    assert "results" in response.data
    assert len(response.data["results"]) <= 10


# -------------------------------------------------------------------
# MODEL VALIDATION
# -------------------------------------------------------------------

@pytest.mark.django_db
def test_min_price_cannot_exceed_max_price(
    listing_type_sale,
    province,
    area,
):
    prop = Property(
        title="Invalid Price Property",
        description="Bad pricing",
        listing_type=listing_type_sale,
        province=province,
        city="Lusaka",
        area=area,
        min_price=500000,
        max_price=300000,
    )

    with pytest.raises(ValidationError):
        prop.full_clean()


@pytest.mark.django_db
def test_sale_property_requires_price_or_range(
    listing_type_sale,
    province,
    area,
):
    prop = Property(
        title="Missing Price",
        description="No price set",
        listing_type=listing_type_sale,
        province=province,
        city="Lusaka",
        area=area,
    )

    with pytest.raises(ValidationError):
        prop.full_clean()


@pytest.mark.django_db
def test_valid_price_range_passes_validation(
    listing_type_sale,
    province,
    area,
    agent_user,
):
    prop = Property(
        title="Valid Pricing",
        description="Looks good",
        listing_type=listing_type_sale,
        province=province,
        city="Lusaka",
        area=area,
        min_price=300000,
        max_price=500000,
        agent=agent_user,
    )

    prop.full_clean()  # should not raise


# -------------------------------------------------------------------
# PRICE DISPLAY LOGIC
# -------------------------------------------------------------------

@pytest.mark.django_db
def test_display_price_prefers_max_price(create_property):
    prop = create_property(
        min_price=300000,
        max_price=700000,
    )

    assert prop.get_display_price() == prop.max_price


@pytest.mark.django_db
def test_display_price_falls_back_to_price(
    listing_type_sale,
    province,
    area,
    agent_user,
):
    prop = Property.objects.create(
        title="Legacy Price",
        description="Old logic",
        listing_type=listing_type_sale,
        province=province,
        city="Lusaka",
        area=area,
        price=450000,
        agent=agent_user,
    )

    assert prop.get_display_price() == prop.price
