from rest_framework import serializers
from .models import Province, Area, PropertyCategory, Property, PropertyImage
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


class PropertyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyCategory
        fields = "__all__"


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "image"]


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    reviews = PropertyReviewSerializer(many=True, read_only=True)
    province = ProvinceSerializer(read_only=True)
    area = AreaSerializer(read_only=True)
    category = PropertyCategorySerializer(read_only=True)
    agent = AgentSerializer(read_only=True)

    # Accept IDs for writable nested relationships
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=PropertyCategory.objects.all(), source="category", write_only=True, required=False
    )
    province_id = serializers.PrimaryKeyRelatedField(
        queryset=Province.objects.all(), source="province", write_only=True, required=False
    )
    area_id = serializers.PrimaryKeyRelatedField(
        queryset=Area.objects.all(), source="area", write_only=True, required=False
    )

    class Meta:
        model = Property
        fields = [
            'id', 'title', 'description', 'price', 'city', 'address',
            'bedrooms', 'bathrooms', 'status', 'availability_status',
            'images', 'reviews',

            # Read-only nested relationships
            'category', 'province', 'area', 'agent',

            # Writable IDs
            'category_id', 'province_id', 'area_id',

            # Extra fields
            'size', 'title_deed_available', 'council_approval', 'caveat_notes'
        ]
