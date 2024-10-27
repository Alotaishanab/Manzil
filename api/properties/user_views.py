from datetime import timezone
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from . import user_serializers
from .models import Property, PropertyView, PropertyShare, PropertyClick, PropertyInquiry, SavedProperties
from .utils import upload_to_s3
from django.contrib.gis.geos import Point
from django.db import connection
from django.http import JsonResponse
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.db.models import F, Q, Subquery
from .helper import map_property
from django.shortcuts import get_object_or_404
from .ownership_validator import verify_property_ownership
from django.core.exceptions import ObjectDoesNotExist


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_property(request):
    if request.method == 'POST':
        serializer = user_serializers.AddPropertySerializer(data=request.data)

        print('Add property request data ', request.data)

        # Validate the data
        if serializer.is_valid():

            ownership_info = serializer.validated_data.get('ownership')
            ownership_type = serializer.validated_data.get('ownershipType')

            ownership_validation = verify_property_ownership(
                ownership_info, ownership_type)

            if not ownership_validation:
                return JsonResponse({'error': 'Ownership validation failed'}, status=400)

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
@permission_classes([AllowAny])
def explore_properties_by_location(request):
    serializer = user_serializers.SearchNearbyPropertiesSerializer(data=request.GET)

    if not serializer.is_valid():
        return JsonResponse({"error": serializer.errors}, status=400)

    # Check if user is authenticated
    if request.user.is_authenticated:
        user_id = request.user.id  # Use 'id' unless you have 'user_id' field
        guest_id = None
    else:
        user_id = None
        guest_id = request.headers.get('Guest-Id')
        if not guest_id:
            return JsonResponse({"error": "Guest ID is required for unauthenticated users"}, status=400)

    user_lat = float(serializer.validated_data['latitude'])
    user_lon = float(serializer.validated_data['longitude'])
    limit = serializer.validated_data.get('limit', 20)
    offset = serializer.validated_data.get('offset', 0)

    user_location = Point(user_lon, user_lat)

    # Exclude properties posted by the same user
    properties = (Property.objects
                  .exclude(user_id=user_id)  # For authenticated users
                  .filter(property_type__in=['for_sale', 'long_term_rent', 'short_term_rent'])
                  .filter(coordinates__distance_lte=(user_location, D(km=50)))
                  .annotate(distance=Distance('coordinates', user_location))
                  .order_by('distance')
                  [offset:offset + limit])

    result = [map_property(property, property.distance) for property in properties]

    return JsonResponse({"properties": result})

@api_view(["GET"])
@permission_classes([AllowAny])
def explore_properties_by_interests(request):
    serializer = user_serializers.SearchInterestedPropertiesSerializer(data=request.GET)
    if not serializer.is_valid():
        return JsonResponse({"error": serializer.errors}, status=400)

    # Check if user is authenticated
    if request.user.is_authenticated:
        user_id = request.user.id
        guest_id = None
    else:
        user_id = None
        guest_id = request.headers.get('Guest-Id')
        if not guest_id:
            return JsonResponse({"error": "Guest ID is required for unauthenticated users"}, status=400)

    limit = serializer.validated_data.get('limit', 20)
    offset = serializer.validated_data.get('offset', 0)

    # Modify queries to include guest_id
    engagement_filters = Q()
    if user_id:
        engagement_filters |= Q(views__user_id=user_id) | Q(shares__user_id=user_id) | Q(clicks__user_id=user_id) | Q(inquiries__user_id=user_id)
    if guest_id:
        engagement_filters |= Q(views__guest_id=guest_id) | Q(shares__guest_id=guest_id) | Q(clicks__guest_id=guest_id) | Q(inquiries__guest_id=guest_id)

    user_engagement = Property.objects.filter(engagement_filters).distinct().values('property_type', 'area', 'price')

    if not user_engagement.exists():
        # If no engagement, return all properties except those by the current user
        properties = Property.objects.exclude(user_id=user_id).order_by('-listing_date')[offset:offset + limit]
        properties_list = [map_property(prop) for prop in properties]
        return JsonResponse({"properties": properties_list})

    # Now find properties similar to those the user or guest has engaged with
    similar_properties = Property.objects.exclude(user_id=user_id).filter(
        Q(property_type__in=Subquery(user_engagement.values('property_type'))) &
        Q(area__in=Subquery(user_engagement.values('area'))) &
        Q(price__in=Subquery(user_engagement.values('price')))
    ).annotate(price_difference=F('price') - Subquery(user_engagement.values('price')[:1])).filter(
        price_difference__lte=10000  # Customize price range difference
    ).order_by('-listing_date')[offset:offset + limit]

    properties_list = [map_property(prop) for prop in similar_properties]

    return JsonResponse({"properties": properties_list})




@api_view(["GET"])
@permission_classes([AllowAny])
def get_property_by_id(request, property_id):
    if request.method == 'GET':
        property_instance = get_object_or_404(Property, pk=property_id)
        property_data = map_property(property_instance)
        return Response(property_data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_property(request, property_id):
    user = request.user
    try:
        property_obj = Property.objects.get(property_id=property_id)
        if property_obj.user_id == user.user_id:
            return Response({"error": "You cannot save your own property"}, status=status.HTTP_400_BAD_REQUEST)
        if SavedProperties.objects.filter(user=user, property=property_obj).exists():
            return Response({"error": "This property is already saved"}, status=status.HTTP_409_CONFLICT)

        # Save the property
        saved_property = SavedProperties.objects.create(
            user=user,
            property=property_obj
        )
        return Response({
            "message": "Property saved successfully",
            "saved_id": saved_property.saved_id
        }, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist:
        return Response({"error": "Property does not exist"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_saved_properties(request):
    if request.method == 'GET':
        user = request.user
        saved_properties = SavedProperties.objects.filter(
            user=user).select_related('property')

        result = [map_property(saved_property.property)
                  for saved_property in saved_properties]

        return JsonResponse({"properties": result})


@api_view(["POST"])
@permission_classes([AllowAny])
def track_property_view(request, property_id):
    if request.user.is_authenticated:
        user = request.user
        guest_id = None
    else:
        user = None
        guest_id = request.headers.get('Guest-Id')
        if not guest_id:
            return Response({"error": "Guest ID is required for unauthenticated users"}, status=status.HTTP_400_BAD_REQUEST)

    start_time = timezone.now()

    # Start tracking the property view
    PropertyView.objects.create(
        property_id=property_id,
        user=user,
        guest_id=guest_id,
        view_date=start_time
    )

    return Response({"message": "Property view started"}, status=status.HTTP_201_CREATED)

@api_view(["POST"])
@permission_classes([AllowAny])
def end_property_view(request, property_id):
    duration = request.data.get('duration_seconds')
    if not duration:
        return Response({"error": "Duration is required"}, status=status.HTTP_400_BAD_REQUEST)

    if request.user.is_authenticated:
        user = request.user
        guest_id = None
    else:
        user = None
        guest_id = request.headers.get('Guest-Id')
        if not guest_id:
            return Response({"error": "Guest ID is required for unauthenticated users"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Record the view
        PropertyView.objects.create(
            property_id=property_id,
            user=user,
            guest_id=guest_id,
            duration_seconds=duration,
            view_date=timezone.now()
        )

        # Update the property view count and total duration
        property_obj = Property.objects.get(property_id=property_id)
        property_obj.increment_view_count()  # Increment view count
        property_obj.add_to_total_duration(duration)  # Add duration to total
        
        return Response({"message": "Property view tracked", "duration": duration}, status=status.HTTP_200_OK)
    except Property.DoesNotExist:
        return Response({"error": "Property does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def track_property_click(request, property_id):
    if request.user.is_authenticated:
        user = request.user
        guest_id = None
    else:
        user = None
        guest_id = request.headers.get('Guest-Id')
        if not guest_id:
            return Response({"error": "Guest ID is required for unauthenticated users"}, status=status.HTTP_400_BAD_REQUEST)

    click_type = request.data.get('click_type', 'general')

    # Record the click
    PropertyClick.objects.create(
        property_id=property_id,
        user=user,
        guest_id=guest_id,
        click_type=click_type,
        click_date=timezone.now()
    )

    return Response({"message": "Property click tracked"}, status=status.HTTP_201_CREATED)

@api_view(["GET"])
@permission_classes([AllowAny])
def get_property_views_and_clicks(request, property_id):
    property_instance = get_object_or_404(Property, pk=property_id)

    total_views = PropertyView.objects.filter(property=property_instance).count()
    total_clicks = PropertyClick.objects.filter(property=property_instance).count()
    total_saves = SavedProperties.objects.filter(property=property_instance).count()

    return Response({
        "property_id": property_id,
        "total_views": total_views,
        "total_clicks": total_clicks,
        "total_saves": total_saves
    }, status=status.HTTP_200_OK)