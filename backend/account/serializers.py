# accounts/serializers.py

from rest_framework import serializers
from .models import User
from django.utils import timezone
from properties.utils import upload_to_s3

class UserRegistrationSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(write_only=True, required=True)
    phone_number = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = (
            'email',
            'phone_number',
            'password',
            'name',
            'confirmPassword',
            'preferences',
            'subscription_plan_id'
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'subscription_plan_id': {'required': False},
            'preferences': {'required': False},
        }

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        if password != confirm_password:
            raise serializers.ValidationError(
                {'password': "Passwords don't match"}
            )

        return data

    def create(self, validated_data):
        # Remove confirmPassword as it's no longer needed
        validated_data.pop('confirmPassword')
        password = validated_data.pop('password')

        # Safely retrieve phone_number, defaulting to an empty string if not provided
        phone_number = validated_data.get('phone_number', '')

        user = User.objects.create_user(
            email=validated_data['email'],
            password=password,
            name=validated_data['name'],
            phone_number=phone_number,  # Use the safely retrieved phone number
            preferences=validated_data.get('preferences'),
            subscription_plan_id=validated_data.get('subscription_plan_id'),
            registration_date=timezone.now()
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.URLField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = (
            'user_id',
            'email',
            'phone_number',
            'name',
            'profile_picture',
            'preferences',
            'subscription_plan_id',
            'last_login',
            'phone_verified',
            'is_staff',
            'registration_date'
            # Add other fields as needed
        )
        read_only_fields = ('user_id', 'email', 'last_login', 'phone_verified', 'is_staff', 'registration_date')

class UserProfilePictureSerializer(serializers.Serializer):
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    def validate_profile_picture(self, value):
        if value:
            if value.size > 2 * 1024 * 1024:  # Limit file size to 2MB
                raise serializers.ValidationError("Image size should not exceed 2MB.")
            if not value.content_type.startswith('image/'):
                raise serializers.ValidationError("Uploaded file is not an image.")
        return value

class UserRegisterPhoneSerializer(serializers.Serializer):
    phone = serializers.CharField()

class UserLogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

class UserVerifyPhoneSerializer(serializers.Serializer):
    verification_code = serializers.IntegerField()

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    confirmPassword = serializers.CharField(write_only=True)
    currentPassword = serializers.CharField(write_only=True)

    def validate(self, data):
        new_password = data.get('password')
        confirm_new_password = data.get('confirmPassword')

        if new_password != confirm_new_password:
            raise serializers.ValidationError(
                {'password': "Passwords don't match"}
            )

        return data

class UserSessionStartSerializer(serializers.Serializer):
    guest_id = serializers.UUIDField(required=False)

class UserSessionEndSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
