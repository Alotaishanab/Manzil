from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import User
from django.utils import timezone


class UserRegistrationSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    name = serializers.CharField()
    confirmPassword = serializers.CharField()

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'password', 'name',
                  'preferences', 'subscription_plan_id')
        extra_kwargs = {'password': {'write_only': True},
                        'subscription_plan_id': {'required': False}}

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        if password != confirm_password:
            raise serializers.ValidationError(
                {'password': "Passwords don't match"}
            )

        return data

    def save(self, **kwargs):
        validated_data = self.validated_data

        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            registration_date=timezone.now()
        )

        return user


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
    confirmPassword = serializers.CharField()
    currentPassword = serializers.CharField()

    def validate(self, data):
        new_password = data.get('password')
        confirm_new_password = data.get('confirmPassword')

        if new_password != confirm_new_password:
            raise serializers.ValidationError(
                {'password': "Passwords don't match"}
            )

        return data
