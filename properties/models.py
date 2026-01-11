from django.contrib.auth import get_user_model
from django.db import models
from django.core.exceptions import ValidationError, NON_FIELD_ERRORS

User = get_user_model()


class Province(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Area(models.Model):
    province = models.ForeignKey(
        Province, on_delete=models.CASCADE, related_name="areas"
    )
    name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.name}, {self.province.name}"


class PropertyType(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class ListingType(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class PropertyFeature(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Property(models.Model):
    AVAILABILITY_CHOICES = [
        ("available", "Available"),
        ("reserved", "Reserved"),
        ("processing", "Processing Papers"),
        ("sold", "Sold"),
    ]

    # Identification
    title = models.CharField(max_length=255)
    short_description = models.CharField(max_length=255, blank=True)
    description = models.TextField()

    # Listing type
    listing_type = models.ForeignKey(
        ListingType, on_delete=models.SET_NULL, null=True, blank=True, related_name="properties"
    )

    # Location
    province = models.ForeignKey(Province, on_delete=models.SET_NULL, null=True)
    city = models.CharField(max_length=100, default="")
    area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    # Physical specs
    property_type = models.CharField(
        max_length=50,
        choices=[
            ("house", "House"),
            ("apartment", "Apartment"),
            ("townhouse", "Townhouse"),
            ("vacant_land", "Vacant Land"),
            ("farm", "Farm"),
            ("commercial", "Commercial"),
            ("industrial", "Industrial"),
        ],
        blank=True,
        null=True,
    )
    bedrooms = models.IntegerField(default=1)
    bathrooms = models.IntegerField(default=1)
    size = models.CharField(max_length=100, blank=True, null=True)
    floor_size = models.FloatField(null=True, blank=True)
    erf_size = models.FloatField(null=True, blank=True)
    parking = models.IntegerField(null=True, blank=True)

    # Features
    pet_friendly = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    garden = models.BooleanField(default=False)
    flatlet = models.BooleanField(default=False)

    # Flags
    on_show = models.BooleanField(default=False)
    on_auction = models.BooleanField(default=False)
    repossessed = models.BooleanField(default=False)
    retirement = models.BooleanField(default=False)
    estate = models.BooleanField(default=False)
    cluster = models.BooleanField(default=False)

    # Status
    availability_status = models.CharField(
        max_length=20, choices=AVAILABILITY_CHOICES, default="available"
    )

    # Pricing
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    min_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    max_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    rent_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    # Paperwork
    title_deed_available = models.BooleanField(default=False)
    council_approval = models.BooleanField(default=False)
    caveat_notes = models.TextField(blank=True, null=True)

    # Agent
    agent = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="properties"
    )

    # Features
    features = models.ManyToManyField(PropertyFeature, blank=True, related_name="properties")

    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        errors = {}

        if self.listing_type:
            slug = self.listing_type.slug.lower()

            if slug == "rent" and not self.rent_amount:
                errors["rent_amount"] = "Rent amount is required for rental properties."

            if slug == "sale":
                if not any([self.price, self.min_price, self.max_price]):
                    errors[NON_FIELD_ERRORS] = (
                        "Sale properties must have a price or a price range."
                    )

                if self.min_price and self.max_price and self.min_price > self.max_price:
                    errors["max_price"] = "Max price must be greater than min price."

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean(exclude=["agent"])
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    def get_display_price(self):
        """
        Return the most appropriate price for display.
        Priority:
        1. max_price
        2. min_price
        3. price
        """
        if self.max_price:
            return self.max_price
        if self.min_price:
            return self.min_price
        return self.price


class PropertyImage(models.Model):
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="property_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.property.title}"
