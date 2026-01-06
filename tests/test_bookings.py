import pytest
from datetime import date, time
from bookings.models import Booking


@pytest.mark.django_db
def test_booking_list(auth_client, create_user, sample_property):
    user = create_user(username="user1")
    client = auth_client(user)
    Booking.objects.create(
        user=user,
        property=sample_property,
        date=date.today(),
        time=time(hour=14, minute=0)
    )
    response = client.get("/api/bookings/")
    assert response.status_code == 200
    assert len(response.data) >= 1


@pytest.mark.django_db
def test_booking_permissions(auth_client, create_user, create_admin, sample_property):
    user1 = create_user(username="user1")
    user2 = create_user(username="user2")
    admin = create_admin()

    booking = Booking.objects.create(
        user=user1,
        property=sample_property,
        date=date.today(),
        time=time(hour=10, minute=0)
    )

    # user can view own booking
    client = auth_client(user1)
    response = client.get(f"/api/bookings/{booking.id}/")
    assert response.status_code == 200

    # user cannot view other's booking
    booking2 = Booking.objects.create(
        user=user2,
        property=sample_property,
        date=date.today(),
        time=time(hour=11)
    )
    response = client.get(f"/api/bookings/{booking2.id}/")
    assert response.status_code == 403

    # admin can view any booking
    client = auth_client(admin)
    response = client.get(f"/api/bookings/{booking.id}/")
    assert response.status_code == 200

    # user can create booking
    client = auth_client(user1)
    data = {
        "property_id": sample_property.id,
        "date": "2025-12-01",
        "time": "14:00:00",
        "message": "Interested"
    }
    response = client.post("/api/bookings/", data)
    assert response.status_code == 201
    assert response.data["user"]["id"] == user1.id
    assert response.data["property"]["id"] == sample_property.id
