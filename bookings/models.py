from django.db import models
from django.contrib.auth import get_user_model
from properties.models import Property

User = get_user_model()


class Booking(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    status = models.CharField(max_length=20, default="pending")

    def __str__(self):
        return f"Booking for {self.property.title} by {self.user.username}"
