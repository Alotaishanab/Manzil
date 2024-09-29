from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from . import user_serializers
from .models import Property
from .utils import upload_to_s3
from django.contrib.gis.geos import Point


@permission_classes([AllowAny])
@api_view(["POST"])
def add_property(request):
    if request.method == 'POST':
        serializer = user_serializers.AddPropertySerializer(data=request.data)

        print('Add property request data ', request.data)

        # Validate the data
        if serializer.is_valid():
            coordinates = None
            marker_position = serializer.validated_data.get('markerPosition')
            if marker_position:
                print('longitude', marker_position['longitude'])
                print('latitude', marker_position['latitude'])
                coordinates = Point(
                    float(marker_position['longitude']), float(marker_position['latitude']))

            # Create a Property instance, but don't save it yet
            property_instance = Property(
                user_id=1,  # request.user.user_id,
                property_type=serializer.validated_data['propertyType'],
                property_category=serializer.validated_data['propertyCategory'],
                property_age=serializer.validated_data.get('propertyAge'),
                title=serializer.validated_data['title'],
                description=serializer.validated_data['description'],
                price=serializer.validated_data['price'],
                area=serializer.validated_data['area'],
                # TODO: Need to confirm this field in UI
                # location=serializer.validated_data['location'],
                coordinates=coordinates,
                contact_information=serializer.validated_data.get(
                    'ownership'),
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

            store_property_media(
                request=request, property_instance=property_instance)

            return Response({
                "message": "Property created successfully!",
                # Returning the newly created property ID
                "propertyId": property_instance.property_id
            }, status=status.HTTP_201_CREATED)
        else:
            # If the data is invalid, return errors
            print('Add property serializer.errors', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def store_property_media(request, property_instance):
    images = request.FILES.getlist('media')
    videos = request.FILES.getlist('media')

    print('images', images)

    # Store the URLs of uploaded images
    image_urls = []
    for image in images:
        image_url = upload_to_s3(
            image, image.name, property_instance.property_id)
        image_urls.append(image_url)

        # Store the URLs of uploaded videos
    video_urls = []
    for video in videos:
        video_url = upload_to_s3(
            video, video.name, property_instance.property_id)
        video_urls.append(video_url)

    print('image_urls', image_urls)
    property_instance.property_images = image_urls
    property_instance.property_videos = video_urls
    property_instance.save(
        update_fields=['property_images', 'property_videos'])
