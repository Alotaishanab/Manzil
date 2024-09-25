from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from . import user_serializers
from .models import Property


@api_view(["POST"])
def add_property(request):
    if request.method == 'POST':
        serializer = user_serializers.AddPropertySerializer(data=request.data)

        # Validate the data
        if serializer.is_valid():
            # Create a Property instance, but don't save it yet
            property_instance = Property(
                user_id=request.user.user_id,
                property_type=serializer.validated_data['propertyType'],
                property_category=serializer.validated_data['propertyCategory'],
                property_age=serializer.validated_data.get('propertyAge'),
                title=serializer.validated_data['title'],
                description=serializer.validated_data['description'],
                price=serializer.validated_data['price'],
                area=serializer.validated_data['area'],
                # TODO: Need to confirm this field in UI
                # location=serializer.validated_data['location'],
                coordinates=serializer.validated_data['markerPosition'],
                contact_information=serializer.validated_data.get(
                    'ownership'),
                # property_images=serializer.validated_data['propertyImages'],
                # property_videos=serializer.validated_data.get(
                #    'propertyVideos'),
                ownership_type=serializer.validated_data.get('ownershipType'),
                bedrooms=serializer.validated_data.get('bedrooms'),
                bathrooms=serializer.validated_data.get('bathrooms'),
                has_water=serializer.validated_data.get('waterAccess', False),
                has_electricity=serializer.validated_data.get(
                    'electricityAccess', False),
                has_sewage=serializer.validated_data.get(
                    'sewageSystem', False),
                direction=serializer.validated_data.get('direction'),
                floors=serializer.validated_data.get('floors'),
                living_rooms=serializer.validated_data.get('livingRooms'),
                rooms=serializer.validated_data.get('rooms'),
                floor_number=serializer.validated_data.get('floorNumber'),
                number_of_streets=serializer.validated_data.get(
                    'numberOfStreets'),
                foot_traffic=serializer.validated_data.get('footTraffic'),
                # TODO: Need to confirm this field in UI
                proximity=serializer.validated_data.get('proximity'),
                parking_spaces=serializer.validated_data.get('parkingSpaces'),
                number_of_gates=serializer.validated_data.get(
                    'numberOfGates'),
                loading_docks=serializer.validated_data.get('loadingDocks'),
                storage_capacity=serializer.validated_data.get(
                    'storageCapacity'),
                number_of_units=serializer.validated_data.get(
                    'numberOfUnits'),
                property_features=serializer.validated_data.get(
                    'propertyFeature'),


            )

            # Save the property
            property_instance.save()

            return Response({
                "message": "Property created successfully!",
                # Returning the newly created property ID
                "propertyId": property_instance.property_id
            }, status=status.HTTP_201_CREATED)
        else:
            # If the data is invalid, return errors
            print('Add property serializer.errors', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
