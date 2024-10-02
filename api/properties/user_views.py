from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from . import user_serializers
from .models import Property, PropertyView, PropertyShare, PropertyClick, PropertyInquiry
from .utils import upload_to_s3
from django.contrib.gis.geos import Point
from django.db import connection
from django.http import JsonResponse
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.db.models import F, Q, Subquery


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
    media_files = request.FILES.getlist('media')
    media_count = len(media_files)

    if (media_count == 0):
        print('Media count is 0')
        return

    print('media_files', media_files)
    image_urls = []
    video_urls = []

    for file in media_files:
        # Check the MIME type of the file to differentiate between images and videos
        mime_type = file.content_type

        print('mime_type', mime_type)
        print('file', file)

        if mime_type.startswith('image'):
            # It's an image file
            image_url = upload_to_s3(
                file, file.name, property_instance.property_id)
            image_urls.append(image_url)

        elif mime_type.startswith('video'):
            # It's a video file
            video_url = upload_to_s3(
                file, file.name, property_instance.property_id)
            video_urls.append(video_url)

    property_instance.property_images = image_urls
    property_instance.property_videos = video_urls
    property_instance.save(
        update_fields=['property_images', 'property_videos'])


@api_view(["GET"])
def explore_properties_by_location(request):

    serializer = user_serializers.SearchNearbyPropertiesSerializer(
        data=request.GET)

    if not serializer.is_valid():
        return JsonResponse({"error": serializer.errors}, status=400)

    user_id = request.user.user_id,
    user_lat = float(serializer.validated_data['latitude'])
    user_lon = float(serializer.validated_data['longitude'])
    limit = serializer.validated_data['limit']
    offset = serializer.validated_data['offset']

    distance_meters = 50000
    user_location = Point(user_lon, user_lat)

    properties = (Property.objects
                  .exclude(user_id=user_id)
                  .filter(property_type__in=['Sell', 'Rent'])
                  .filter(coordinates__distance_lte=(user_location, D(km=50)))
                  .annotate(distance=Distance('coordinates', user_location))
                  .order_by('distance')
                  [offset:offset + limit])

    result = [{"property_id": property.property_id,
               "property_type": property.property_type,
               "title": property.title,
               "description": property.description,
               "price": property.price,
               "contact_information": property.contact_information,
               "property_images": property.property_images,
               "property_videos": property.property_videos,
               "distance": property.distance.m} for property in properties]

    return JsonResponse({"properties": result})


@api_view(["GET"])
def explore_properties_by_interests(request):

    serializer = user_serializers.SearchInterestedPropertiesSerializer(
        data=request.GET)
    if not serializer.is_valid():
        return JsonResponse({"error": serializer.errors}, status=400)

    user_id = request.user.user_id,
    limit = serializer.validated_data['limit']
    offset = serializer.validated_data['offset']

    # Get properties the user has interacted with (viewed, shared, clicked, inquired)
    user_engagement = Property.objects.filter(
        Q(views__user_id=user_id) |
        Q(shares__user_id=user_id) |
        Q(clicks__user_id=user_id) |
        Q(inquiries__user_id=user_id)
    ).distinct().values('property_type', 'area', 'price')

    if not user_engagement.exists():
        # If no engagement, return all properties except those by the current user
        all_properties = Property.objects.exclude(user_id=user_id).order_by(
            '-listing_date')[offset:offset + limit]

        properties = [
            {
                "property_id": prop.property_id,
                "title": prop.title,
                "price": prop.price,
                "property_type": prop.property_type,
                "contact_information": prop.contact_information,
                "property_images": prop.property_images,
                "property_videos": prop.property_videos,
            }
            for prop in all_properties
        ]

        return JsonResponse({"properties": properties})

    # Now find properties similar to those the user has engaged with
    similar_properties = Property.objects.exclude(user_id=user_id).filter(
        Q(property_type__in=user_engagement.values('property_type')) &
        Q(area__in=user_engagement.values('area')) &
        Q(price__in=user_engagement.values('price'))
    ).annotate(price_difference=F('price') - Subquery(user_engagement.values('price')[:1])).filter(
        price_difference__lte=10000  # Customize price range difference
    ).order_by('-listing_date')[offset:offset + limit]

    # Return the list of similar properties as JSON
    properties = [{"property_id": prop.property_id, "title": prop.title,
                   "property_images": prop.property_images,
                   "property_videos": prop.property_videos,
                   "price": prop.price, "property_type": prop.property_type, "contact_information": prop.contact_information, } for prop in similar_properties]

    return JsonResponse({"properties": properties})
