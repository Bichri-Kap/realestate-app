from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_agent = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pictures/", blank=True, null=True)

    def __str__(self):
        return self.username


class Agent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    # Agent rating from user reviews later
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return f"Agent: {self.user.username}"
