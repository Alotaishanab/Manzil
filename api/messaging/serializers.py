# messaging/serializers.py

from rest_framework import serializers
from .models import Message
from django.contrib.auth import get_user_model  # Import get_user_model
from account.serializers import UserSerializer

User = get_user_model()  # Retrieve the User model class

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'email', 'name', 'phone_number', 'profile_picture']

class MessageSerializer(serializers.ModelSerializer):
    # Use the nested user serializer
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    pinned_by = UserSerializer(many=True, read_only=True)  # Show details of users who pinned


    class Meta:
        model = Message
        fields = '__all__'

    def validate_receiver(self, value):
        request = self.context.get('request')
        if request and request.user == value:
            raise serializers.ValidationError("You cannot send messages to yourself.")
        return value
