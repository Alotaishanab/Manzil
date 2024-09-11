from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'password', 'name',
                  'preferences', 'subscription_plan_id')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password'],
            name=validated_data['name'],
            preferences=validated_data.get('preferences'),
            subscription_plan_id=validated_data.get('subscription_plan_id')
        )
        return user
