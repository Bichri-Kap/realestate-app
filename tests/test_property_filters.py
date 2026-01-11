import pytest
from properties.models import PropertyFeature
from django.urls import reverse


@pytest.mark.django_db
class TestPropertyFilters:

    @pytest.fixture
    def setup_features(self):
        pet = PropertyFeature.objects.create(name="Pet Friendly")
        pool = PropertyFeature.objects.create(name="Pool")
        garden = PropertyFeature.objects.create(name="Garden")
        return {"pet": pet, "pool": pool, "garden": garden}

    def test_min_max_price_filter(self, create_property, api_client):
        p1 = create_property(min_price=100_000, max_price=200_000)
        p2 = create_property(min_price=300_000, max_price=400_000)

        url = reverse("property-list")

        response = api_client.get(url, {"min_price": 250_000})
        data = response.json()["results"]
        assert any(d["id"] == p2.id for d in data)
        assert all(d["id"] != p1.id for d in data)

        response = api_client.get(url, {"max_price": 250_000})
        data = response.json()["results"]
        assert any(d["id"] == p1.id for d in data)
        assert all(d["id"] != p2.id for d in data)

    def test_bedrooms_bathrooms_parking_filter(self, create_property, api_client):
        create_property(bedrooms=2, bathrooms=1, parking=1)
        create_property(bedrooms=4, bathrooms=3, parking=2)

        url = reverse("property-list")
        response = api_client.get(url, {"min_bedrooms": 3})
        data = response.json()["results"]
        assert all(d["bedrooms"] >= 3 for d in data)

        response = api_client.get(url, {"min_bathrooms": 2})
        data = response.json()["results"]
        assert all(d["bathrooms"] >= 2 for d in data)

        response = api_client.get(url, {"min_parking": 2})
        data = response.json()["results"]
        assert all(d.get("parking", 0) >= 2 for d in data)

    def test_floor_erf_size_filter(self, create_property, api_client):
        create_property(floor_size=100, erf_size=200)
        create_property(floor_size=300, erf_size=400)

        url = reverse("property-list")
        response = api_client.get(url, {"min_floor_size": 200})
        data = response.json()["results"]
        assert all(d.get("floor_size", 0) >= 200 for d in data)

        response = api_client.get(url, {"min_erf_size": 300})
        data = response.json()["results"]
        assert all(d.get("erf_size", 0) >= 300 for d in data)

    def test_boolean_feature_filters(self, create_property, api_client):
        create_property(pet_friendly=True, pool=False, garden=True)
        create_property(pet_friendly=False, pool=True, garden=False)

        url = reverse("property-list")
        response = api_client.get(url, {"pet_friendly": True})
        data = response.json()["results"]
        assert all(d["pet_friendly"] is True for d in data)

        response = api_client.get(url, {"pool": True})
        data = response.json()["results"]
        assert all(d["pool"] is True for d in data)

        response = api_client.get(url, {"garden": True})
        data = response.json()["results"]
        assert all(d["garden"] is True for d in data)

    def test_other_flag_filters(self, create_property, api_client):
        create_property(
            on_show=True,
            on_auction=False,
            repossessed=False,
            retirement=True,
            estate=True,
            cluster=False,
        )
        create_property(
            on_show=False,
            on_auction=True,
            repossessed=True,
            retirement=False,
            estate=False,
            cluster=True,
        )

        url = reverse("property-list")
        for flag in [
            "on_show",
            "on_auction",
            "repossessed",
            "retirement",
            "estate",
            "cluster",
        ]:
            response = api_client.get(url, {flag: True})
            data = response.json()["results"]
            assert all(d[flag] is True for d in data)

    def test_m2m_features_filter(self, create_property, setup_features, api_client):
        p1 = create_property()
        p2 = create_property()
        p1.features.add(setup_features["pet"])
        p2.features.add(setup_features["pool"])

        url = reverse("property-list")
        response = api_client.get(url, {"features": setup_features["pet"].id})
        data = response.json()["results"]
        assert all(setup_features["pet"].id in d["features"] for d in data)
