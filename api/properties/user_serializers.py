from rest_framework import serializers


class PropertyFeatureSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    icon = serializers.CharField()


class AddPropertySerializer(serializers.Serializer):
    propertyType = serializers.CharField()
    propertyCategory = serializers.CharField()
    propertyAge = serializers.IntegerField(required=False)
    ownershipType = serializers.CharField()
    title = serializers.CharField()
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    area = serializers.DecimalField(max_digits=10, decimal_places=2)
    location = serializers.CharField(required=False)
    markerPosition = serializers.CharField(required=True)
    status = serializers.CharField(required=False)
    ownership = serializers.CharField(required=True)
    propertyImages = serializers.ListField(
        child=serializers.CharField(), required=False)
    propertyVideos = serializers.ListField(
        child=serializers.CharField(), required=False)
    bedrooms = serializers.IntegerField(required=False)
    bathrooms = serializers.IntegerField(required=False)
    waterAccess = serializers.BooleanField(default=False)
    electricityAccess = serializers.BooleanField(default=False)
    sewageSystem = serializers.BooleanField(default=False)
    direction = serializers.CharField(required=False)
    floors = serializers.IntegerField(required=False)
    livingRooms = serializers.IntegerField(required=False)
    rooms = serializers.IntegerField(required=False)
    floorNumber = serializers.IntegerField(required=False)
    numberOfStreets = serializers.IntegerField(required=False)
    footTraffic = serializers.CharField(required=False)
    proximity = serializers.CharField(required=False)
    parkingSpaces = serializers.IntegerField(required=False)
    numberOfGates = serializers.IntegerField(required=False)
    loadingDocks = serializers.IntegerField(required=False)
    storageCapacity = serializers.IntegerField(required=False)
    numberOfUnits = serializers.IntegerField(required=False)
    propertyFeature = serializers.ListField(
        child=PropertyFeatureSerializer(), required=False)
