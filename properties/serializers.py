from rest_framework import serializers
from .models import Province, Area, PropertyCategory, Property, PropertyImage
from reviews.serializers import PropertyReviewSerializer
from accounts.serializers import AgentSerializer


class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = '__all__'


class AreaSerializer(serializers.ModelSerializer):
    province = ProvinceSerializer(read_only=True)

    class Meta:
        model = Area
        fields = '__all__'


class PropertyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyCategory
        fields = '__all__'


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image']


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    reviews = PropertyReviewSerializer(many=True, read_only=True)
    agent = AgentSerializer(read_only=True)
    category = PropertyCategorySerializer(read_only=True)
    province = ProvinceSerializer(read_only=True)
    area = AreaSerializer(read_only=True)

    class Meta:
        model = Property
        fields = '__all__'
