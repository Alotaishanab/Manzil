# properties/user_serializers.py

from rest_framework import serializers
from .models import (
    PropertyView,
    Property,
    PropertyShare,
    PropertyClick,
    PropertyInquiry,
    SavedProperties
)

class PropertyFeatureSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    icon = serializers.CharField()


class MarkerPositionSerializer(serializers.Serializer):
    latitude = serializers.DecimalField(max_digits=20, decimal_places=17)
    longitude = serializers.DecimalField(max_digits=20, decimal_places=17)


class PropertyOwnershipSerializer(serializers.Serializer):
    instrumentNumber = serializers.CharField(required=True)
    ownerIDNumber = serializers.CharField(required=False)
    ownerDOB = serializers.CharField(required=False)
    agencyNumber = serializers.CharField(required=False)
    commercialRegNumber = serializers.CharField(required=False)
    agentIDNumber = serializers.CharField(required=False)
    agentDOB = serializers.CharField(required=False)


class AddPropertySerializer(serializers.Serializer):
    propertyType = serializers.CharField()
    propertyCategory = serializers.CharField()
    propertyAge = serializers.IntegerField(required=False, allow_null=True)
    ownershipType = serializers.ChoiceField(choices=['independent', 'multipleOwners', 'agency'])
    title = serializers.CharField()
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    area = serializers.DecimalField(max_digits=10, decimal_places=2)
    location = serializers.CharField(required=False, allow_blank=True)
    markerPosition = MarkerPositionSerializer(required=False, allow_null=True)
    status = serializers.CharField(required=False, allow_blank=True)
    ownership = PropertyOwnershipSerializer(required=False, allow_null=True)
    bedrooms = serializers.IntegerField(required=False, allow_null=True)
    bathrooms = serializers.IntegerField(required=False, allow_null=True)
    waterAccess = serializers.BooleanField(default=False)
    electricityAccess = serializers.BooleanField(default=False)
    sewageSystem = serializers.BooleanField(default=False)
    direction = serializers.ChoiceField(choices=['North', 'South', 'East', 'West'], required=False, allow_null=True)
    floors = serializers.IntegerField(required=False, allow_null=True)
    livingRooms = serializers.IntegerField(required=False, allow_null=True)
    rooms = serializers.IntegerField(required=False, allow_null=True)
    floorNumber = serializers.IntegerField(required=False, allow_null=True)
    numberOfStreets = serializers.IntegerField(required=False, allow_null=True)
    footTraffic = serializers.ChoiceField(choices=['High', 'Medium', 'Low'], required=False, allow_null=True)
    proximity = serializers.CharField(required=False, allow_blank=True)
    parkingSpaces = serializers.IntegerField(required=False, allow_null=True)
    numberOfGates = serializers.IntegerField(required=False, allow_null=True)
    loadingDocks = serializers.IntegerField(required=False, allow_null=True)
    storageCapacity = serializers.IntegerField(required=False, allow_null=True)
    numberOfUnits = serializers.IntegerField(required=False, allow_null=True)
    propertyFeature = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    media = serializers.ListField(
        child=serializers.FileField(),
        required=False,
        allow_empty=True
    )

    def validate_media(self, value):
        allowed_mime_types = ['image/jpeg', 'image/png', 'video/mp4', 'video/mov']
        max_file_size = 50 * 1024 * 1024  # 50 MB
        for file in value:
            if file.content_type not in allowed_mime_types:
                raise serializers.ValidationError(f"Unsupported file type: {file.content_type}")
            if file.size > max_file_size:
                raise serializers.ValidationError(f"File size exceeds limit: {file.size} bytes")
        return value

class SearchNearbyPropertiesSerializer(serializers.Serializer):
    latitude = serializers.DecimalField(max_digits=20, decimal_places=17)
    longitude = serializers.DecimalField(max_digits=20, decimal_places=17)
    limit = serializers.IntegerField(default=20)
    offset = serializers.IntegerField(default=0)


class SearchInterestedPropertiesSerializer(serializers.Serializer):
    limit = serializers.IntegerField(default=20)
    offset = serializers.IntegerField(default=0)


class PropertyViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyView
        fields = '__all__'

    def validate(self, data):
        user = self.context['request'].user
        guest_id = self.context['request'].headers.get('Guest-Id')

        if not user.is_authenticated and not guest_id:
            raise serializers.ValidationError("Authentication or Guest ID is required.")

        return data
