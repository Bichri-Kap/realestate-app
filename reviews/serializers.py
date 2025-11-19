from rest_framework import serializers
from .models import PropertyReview, AgentReview
from accounts.serializers import UserSerializer
# from properties.serializers import PropertySerializer


class PropertyReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    property = serializers.StringRelatedField()  # just show property title

    class Meta:
        model = PropertyReview
        fields = ['id', 'property', 'user', 'rating', 'comment', 'created_at']


class AgentReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    agent = serializers.StringRelatedField()  # shows agent username

    class Meta:
        model = AgentReview
        fields = ['id', 'agent', 'user', 'rating', 'comment', 'created_at']
