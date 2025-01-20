from core import settings
import requests


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
