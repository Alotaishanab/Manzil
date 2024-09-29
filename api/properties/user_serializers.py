from rest_framework import serializers


class PropertyFeatureSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    icon = serializers.CharField()


class MarkerPositionSerializer(serializers.Serializer):
    latitude = serializers.DecimalField(max_digits=20, decimal_places=17)
    longitude = serializers.DecimalField(max_digits=20, decimal_places=17)


class PropertyOwnerShipSerializer(serializers.Serializer):
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
    propertyAge = serializers.IntegerField(required=False)
    ownershipType = serializers.CharField()
    title = serializers.CharField()
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    area = serializers.DecimalField(max_digits=10, decimal_places=2)
    location = serializers.CharField(required=False)
    markerPosition = MarkerPositionSerializer(required=True)
    status = serializers.CharField(required=False)
    ownership = PropertyOwnerShipSerializer(required=True)
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
        child=serializers.CharField(), required=False)
    media = serializers.ListField(
        child=serializers.FileField(),
        required=False,
        allow_empty=True
    )
