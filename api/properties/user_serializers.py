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


class PropertiesMapSerializer(serializers.Serializer):
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


class UserPropertySerializer(serializers.ModelSerializer):
    # We'll add a single SerializerMethodField to bundle the lister info
    lister_info = serializers.SerializerMethodField()
    # Also include the rented period (if applicable)
    rented_period = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = (
            'property_id', 
            'user', 
            'listing_date',
            'view_count',
            'total_view_duration',
            'price_per_meter'
        )

    def get_lister_info(self, obj):
        """
        Bundle all lister-related information into one nested dict.
        """
        if obj.user:
            return {
                "lister_profile_picture": obj.user.profile_picture if getattr(obj.user, 'profile_picture', None) else None,
                "lister_name": obj.user.name,
                "lister_registration_date": obj.user.registration_date,
            }
        return {}

    def get_rented_period(self, obj):
        """
        Return the rented period if the property is rented.
        """
        if obj.status == 'rented':
            advertiser_info = obj.advertiser_info
            if advertiser_info and isinstance(advertiser_info, dict):
                return advertiser_info.get('rented_period')
        return None

    def to_representation(self, instance):
        """
        Override to nest property details and lister info.
        """
        rep = super().to_representation(instance)
        
        # Create a nested dictionary for property details.
        property_details = {
            "property_id": rep.get("property_id"),
            "property_type": rep.get("property_type"),
            "property_category": rep.get("property_category"),
            "property_age": rep.get("property_age"),
            "title": rep.get("title"),
            "description": rep.get("description"),
            "price": rep.get("price"),
            "area": rep.get("area"),
            "price_per_meter": rep.get("price_per_meter"),
            "location": rep.get("location"),
            "coordinates": rep.get("coordinates"),
            "listing_date": rep.get("listing_date"),
            "status": rep.get("status"),
            "ownership_type": rep.get("ownership_type"),
            "contact_information": rep.get("contact_information"),
            "property_images": rep.get("property_images"),
            "property_videos": rep.get("property_videos"),
            "bedrooms": rep.get("bedrooms"),
            "bathrooms": rep.get("bathrooms"),
            "has_water": rep.get("has_water"),
            "has_electricity": rep.get("has_electricity"),
            "has_sewage": rep.get("has_sewage"),
            "direction": rep.get("direction"),
            "floors": rep.get("floors"),
            "living_rooms": rep.get("living_rooms"),
            "rooms": rep.get("rooms"),
            "floor_number": rep.get("floor_number"),
            "number_of_streets": rep.get("number_of_streets"),
            "foot_traffic": rep.get("foot_traffic"),
            "proximity": rep.get("proximity"),
            "parking_spaces": rep.get("parking_spaces"),
            "number_of_gates": rep.get("number_of_gates"),
            "loading_docks": rep.get("loading_docks"),
            "storage_capacity": rep.get("storage_capacity"),
            "number_of_units": rep.get("number_of_units"),
            "property_features": rep.get("property_features"),
            "ad_id": rep.get("ad_id"),
            "ad_license_number": rep.get("ad_license_number"),
            "unified_number_of_establishment": rep.get("unified_number_of_establishment"),
            "fal_license_number": rep.get("fal_license_number"),
            "fal_registration_date": rep.get("fal_registration_date"),
            "advertiser_info": rep.get("advertiser_info"),
            "similar_properties": rep.get("similar_properties"),
            "view_count": rep.get("view_count"),
            "total_view_duration": rep.get("total_view_duration"),
            "user": rep.get("user")
        }

        # Now return the final nested structure.
        return {
            "property_details": property_details,
            "lister_info": rep.get("lister_info"),
            "rented_period": rep.get("rented_period")
        }
