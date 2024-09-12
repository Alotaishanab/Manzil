from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
from .verify import send_code, check_code
from .jwt_utils import blacklist_token


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'password', 'name',
                  'preferences', 'subscription_plan_id')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        email = data.get('email')
        phone_number = data.get('phone_number')

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {'email': 'Email is already registered.'})

        if User.objects.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError(
                {'phone_number': 'Phone number is already registered.'})
            return

        return data

    def save(self, **kwargs):
        validated_data = self.validated_data
        user = User.objects.create_user(
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password'],
            name=validated_data['name'],
            preferences=validated_data.get('preferences'),
            subscription_plan_id=validated_data.get('subscription_plan_id')
        )
        send_code(validated_data['phone_number'])
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")

        if not user.phone_verified:
            raise serializers.ValidationError("Phone number is not verified.")

        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])

        return user


class UserLogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, data):
        self.token = data['refresh']
        return data

    def save(self, **kwargs):
        try:
            blacklist_token(self.token)
        except Exception as e:
            raise serializers.ValidationError("Invalid token")


class UserVerifyPhoneSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    verification_code = serializers.IntegerField()

    def validate(self, data):
        phone_number = data.get('phone_number')
        verification_code = data.get('verification_code')

        try:
            user = User.objects.get(phone_number=phone_number)
            if (check_code(phone_number, verification_code)):
                user.phone_verified = True
                user.save(update_fields=['phone_verified'])
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "User with this phone number does not exist.")
