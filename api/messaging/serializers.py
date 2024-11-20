# messaging/serializers.py

from rest_framework import serializers
from .models import Message
from django.contrib.auth import get_user_model  # Import get_user_model

User = get_user_model()  # Retrieve the User model class

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'email', 'name', 'phone_number']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'body', 'timestamp', 'status']  # Removed 'subject'
        read_only_fields = ['id', 'sender', 'timestamp', 'status']

    def validate_receiver(self, value):
        request = self.context.get('request')
        if request and request.user == value:
            raise serializers.ValidationError("You cannot send messages to yourself.")
        return value
