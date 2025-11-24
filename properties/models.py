from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Province(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Area(models.Model):
    province = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='areas')
    name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.name}, {self.province.name}"


class PropertyCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Property(models.Model):
    AVAILABILITY_CHOICES = [
        ('available', 'Available'),
        ('reserved', 'Reserved'),
        ('processing', 'Processing Papers'),
        ('sold', 'Sold'),
    ]

    title = models.CharField(max_length=255)
    category = models.ForeignKey(PropertyCategory, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)

    province = models.ForeignKey(Province, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, default="available")
    bedrooms = models.IntegerField(default=1)
    bathrooms = models.IntegerField(default=1)
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, default="")
    area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True)

    description = models.TextField()
    size = models.CharField(max_length=100, blank=True, null=True)

    availability_status = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='available')

    # Paperwork tracking
    title_deed_available = models.BooleanField(default=False)
    council_approval = models.BooleanField(default=False)
    caveat_notes = models.TextField(blank=True, null=True)

    # Linking with agent
    agent = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='properties')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="property_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.property.title}"
