from core import settings
import requests
from django.db.models import F
from django.db.models.functions import Abs
from .models import Property

def calculate_similar_properties(base_property):
    """
    Calculate up to 3 similar properties for the given base_property.
    This function applies:
      - Matching property type and category,
      - Category-specific filters (e.g., bedrooms for House, parking_spaces for Shop),
      - A price difference threshold that depends on whether the property is for sale or rent.
    Returns a list of mapped property dictionaries.
    """
    try:
        base_price = float(base_property.price)
    except (TypeError, ValueError):
        return []

    # Define price threshold based on property type:
    if base_property.property_type in ['for_sale', 'land_sale']:
        price_threshold = base_price * 0.10
    else:
        price_threshold = base_price * 0.20

    # Base queryset: same type and category, excluding the base property.
    qs = Property.objects.filter(
        property_type=base_property.property_type,
        property_category=base_property.property_category
    ).exclude(property_id=base_property.property_id)

    category = base_property.property_category

    # Apply category-specific filters.
    if category == 'House':
        if base_property.bedrooms is not None:
            qs = qs.filter(
                bedrooms__gte=max(0, base_property.bedrooms - 1),
                bedrooms__lte=base_property.bedrooms + 1
            )
        if base_property.bathrooms is not None:
            qs = qs.filter(
                bathrooms__gte=max(0, base_property.bathrooms - 1),
                bathrooms__lte=base_property.bathrooms + 1
            )
        if base_property.floors is not None:
            qs = qs.filter(
                floors__gte=max(0, base_property.floors - 1),
                floors__lte=base_property.floors + 1
            )
    elif category == 'Apartment':
        if base_property.bedrooms is not None:
            qs = qs.filter(
                bedrooms__gte=max(0, base_property.bedrooms - 1),
                bedrooms__lte=base_property.bedrooms + 1
            )
    elif category == 'Shop':
        if base_property.parking_spaces is not None:
            qs = qs.filter(
                parking_spaces__gte=max(0, base_property.parking_spaces - 1),
                parking_spaces__lte=base_property.parking_spaces + 1
            )
    elif category == 'Warehouse':
        if base_property.number_of_gates is not None:
            qs = qs.filter(number_of_gates=base_property.number_of_gates)
        if base_property.storage_capacity is not None:
            qs = qs.filter(
                storage_capacity__gte=base_property.storage_capacity * 0.9,
                storage_capacity__lte=base_property.storage_capacity * 1.1
            )
    elif category == 'Office':
        if base_property.parking_spaces is not None:
            qs = qs.filter(
                parking_spaces__gte=max(0, base_property.parking_spaces - 1),
                parking_spaces__lte=base_property.parking_spaces + 1
            )
    elif category in ['Tower', 'Chalet', 'Workers Residence']:
        if base_property.bedrooms is not None:
            qs = qs.filter(
                bedrooms__gte=max(0, base_property.bedrooms - 1),
                bedrooms__lte=base_property.bedrooms + 1
            )
    elif category in ['Land', 'Farmland']:
        qs = qs.filter(area=base_property.area)

    # Annotate with absolute price difference and filter by threshold.
    qs = qs.annotate(price_diff=Abs(F('price') - base_price))
    qs = qs.filter(price_diff__lte=price_threshold).order_by('price_diff')[:3]

    similar_properties = [map_property(prop) for prop in qs]
    return similar_properties

def map_property(property_instance, distance=None):
    address = None
    lat = None
    lng = None
    if property_instance.coordinates:
        lat = property_instance.coordinates.y
        lng = property_instance.coordinates.x
        address = get_property_address(lat, lng)

    property_data = {
        "property_id": property_instance.property_id,
        "property_type": property_instance.property_type,
        "property_category": property_instance.property_category,
        "listing_date": property_instance.listing_date,
        "location": property_instance.location,
        "area": property_instance.area,
        "title": property_instance.title,
        "description": property_instance.description,
        "price": property_instance.price,
        "contact_information": property_instance.contact_information,
        "property_images": property_instance.property_images,
        "property_videos": property_instance.property_videos,
        "bedrooms": property_instance.bedrooms,
        "bathrooms": property_instance.bathrooms,
        "has_water": property_instance.has_water,
        "has_electricity": property_instance.has_electricity,
        "has_sewage": property_instance.has_sewage,
        "floors": property_instance.floors,
        "rooms": property_instance.rooms,
        "living_rooms": property_instance.living_rooms,
        "floor_number": property_instance.floor_number,
        "number_of_streets": property_instance.number_of_streets,
        "foot_traffic": property_instance.foot_traffic,
        "proximity": property_instance.proximity,
        "parking_spaces": property_instance.parking_spaces,
        "number_of_gates": property_instance.number_of_gates,
        "loading_docks": property_instance.loading_docks,
        "storage_capacity": property_instance.storage_capacity,
        "number_of_units": property_instance.number_of_units,
        "property_features": property_instance.property_features,
        "address": address,
        "ownership_type": property_instance.ownership_type,
    }

    if lat and lng:
        property_data["coordinates"] = {"lat": lat, "long": lng}

    if distance is not None:
        property_data["distance"] = distance.m  # meters

    # Add lister's details since a property cannot exist without an associated user
    property_data["lister_name"] = property_instance.user.name
    property_data["lister_registration_date"] = property_instance.user.registration_date
    property_data["lister_id"] = property_instance.user.user_id

    return property_data

def get_property_address(lat, lng):
    api_key = settings.GOOGLE_API_KEY
    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={api_key}"

    try:
        response = requests.get(url)
        response.raise_for_status()

        data = response.json()
        if data['status'] == 'OK':
            address = data['results'][0]['formatted_address']
            return address
        else:
            print(f"Error from Geocoding API: {data['status']}")
            return None
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        return None
    except Exception as err:
        print(f"Other error occurred: {err}")
        return None
