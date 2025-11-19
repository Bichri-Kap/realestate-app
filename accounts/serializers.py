from rest_framework import serializers
from .models import User, Agent


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_agent', 'phone_number', 'profile_picture']


class AgentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Agent
        fields = ['id', 'user', 'company_name', 'bio', 'rating']
