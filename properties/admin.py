from django.contrib import admin
from .models import (
    Property,
    PropertyImage,
    PropertyType,
    Province,
    Area,
    ListingType,
    PropertyFeature,
)


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "listing_type",
        "property_type",
        "price",
        "city",
        "province",
        "area",
        "bedrooms",
        "availability_status",
        "on_show",
        "on_auction",
        "created_at",
    )

    list_filter = (
        "availability_status",
        "listing_type",
        "province",
        "area",
        "property_type",
        "repossessed",
        "estate",
        "cluster",
        "retirement",
        "on_auction",
        "on_show",
    )

    search_fields = ("title", "city", "address", "description")

    ordering = ("-created_at",)

    inlines = [PropertyImageInline]

    fieldsets = (
        ("Basic Info", {
            "fields": (
                "title", "description",
                "listing_type", "property_type",
                "availability_status"
            )
        }),

        ("Location", {
            "fields": ("province", "city", "area", "address")
        }),

        ("Physical Specs", {
            "fields": (
                "bedrooms", "bathrooms", "size",
                "floor_size", "erf_size", "parking"
            )
        }),

        ("Features & Amenities", {
            "fields": ("pet_friendly", "pool", "garden", "flatlet", "features")
        }),

        ("Special Flags", {
            "fields": (
                "on_show", "on_auction",
                "repossessed", "retirement",
                "estate", "cluster"
            )
        }),

        ("Pricing", {
            "fields": ("min_price", "max_price", "rent_amount")
        }),

        ("Paperwork", {
            "fields": ("title_deed_available", "council_approval", "caveat_notes")
        }),

        ("Agent", {"fields": ("agent",)}),
    )


admin.site.register(PropertyImage)
admin.site.register(PropertyType)
admin.site.register(Province)
admin.site.register(Area)
admin.site.register(ListingType)
admin.site.register(PropertyFeature)
