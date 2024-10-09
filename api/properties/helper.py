def map_property(property_instance, distance=None):
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
    }

    # Only add distance if it is available (for nearby property searches)
    if distance is not None:
        property_data["distance"] = distance.m  # meters

    return property_data
