from rest_framework import serializers
from .models import (
    Province,
    Area,
    PropertyType,
    Property,
    PropertyImage,
    ListingType,
    PropertyFeature,
)
from reviews.serializers import PropertyReviewSerializer
from accounts.serializers import AgentSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = "__all__"


class AreaSerializer(serializers.ModelSerializer):
    province = ProvinceSerializer(read_only=True)

    class Meta:
        model = Area
        fields = "__all__"


class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = "__all__"


class ListingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingType
        fields = "__all__"


class PropertyFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFeature
        fields = "__all__"


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "image"]


class PropertySerializer(serializers.ModelSerializer):
    price_display = serializers.SerializerMethodField()
    images = PropertyImageSerializer(many=True, read_only=True)
    reviews = PropertyReviewSerializer(many=True, read_only=True)
    province = ProvinceSerializer(read_only=True)
    area = AreaSerializer(read_only=True)
    agent = AgentSerializer(read_only=True)
    listing_type = ListingTypeSerializer(read_only=True)
    features = PropertyFeatureSerializer(many=True, read_only=True)
    short_description = serializers.SerializerMethodField()
    property_type_label = serializers.SerializerMethodField()

    # Accept IDs for writable nested relationships
    province_id = serializers.PrimaryKeyRelatedField(
        queryset=Province.objects.all(),
        source="province",
        write_only=True,
    )
    area_id = serializers.PrimaryKeyRelatedField(
        queryset=Area.objects.all(),
        source="area",
        write_only=True,
    )
    listing_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ListingType.objects.all(),
        source="listing_type",
        write_only=True
    )
    feature_ids = serializers.PrimaryKeyRelatedField(
        queryset=PropertyFeature.objects.all(),
        many=True,
        source="features",
        write_only=True,
        required=False,
    )

    class Meta:
        model = Property
        fields = [
            "id",
            "title",
            "short_description",
            "description",
            "price",
            "price_display",
            "property_type_label",
            "rent_amount",
            "city",
            "address",
            "bedrooms",
            "bathrooms",
            "availability_status",
            "images",
            "reviews",
            "province",
            "area",
            "agent",
            "listing_type",
            "features",
            "province_id",
            "area_id",
            "listing_type_id",
            "feature_ids",
            "size",
            "floor_size",
            "erf_size",
            "parking",
            "pet_friendly",
            "pool",
            "garden",
            "flatlet",
            "on_show",
            "on_auction",
            "repossessed",
            "retirement",
            "estate",
            "cluster",
            "min_price",
            "max_price",
            "title_deed_available",
            "council_approval",
            "caveat_notes",
        ]

    def get_short_description(self, obj):
        if obj.short_description:
            return obj.short_description
        return obj.description[:160] + "…" if obj.description else ""

    def get_price_display(self, obj):
        """
        Return the appropriate price for display on frontend.
        - For rent listings, return rent_amount
        - For sale listings, return price if set, else max_price, else min_price
        """
        try:
            if obj.listing_type and getattr(obj.listing_type, "slug", "").lower() == "rent":
                return obj.rent_amount if obj.rent_amount is not None else None
            # Sale
            if obj.price is not None:
                return obj.price
            if obj.max_price is not None:
                return obj.max_price
            if obj.min_price is not None:
                return obj.min_price
            return None
        except AttributeError:
            return None

    def get_property_type_label(self, obj):
        type_map = {
            "house": "House",
            "apartment": "Apartment",
            "townhouse": "Townhouse",
            "vacant_land": "Vacant Land",
            "farm": "Farm",
            "commercial": "Commercial",
            "industrial": "Industrial",
        }
        return type_map.get(obj.property_type, obj.property_type or "")
