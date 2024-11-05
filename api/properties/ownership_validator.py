# properties/utils.py

# import requests
# from django.conf import settings

# api_headers = {
#     'accept': 'application/json',
#     'apiKey': settings.MOJ_API_KEY
# }

def verify_property_ownership(ownership_info, ownership_type):
    # Temporarily disable ownership validation and always return True
    # Commented out the actual validation logic
    # if ownership_type == 'independent':
    #     deed_number = ownership_info.get('instrumentNumber')
    #     national_id = ownership_info.get('ownerIDNumber')
    #     return validate_property_individual_ownership(deed_number, national_id)
    # elif ownership_type == 'agency':
    #     agency_number = ownership_info.get('agentIDNumber')
    #     return validate_property_agency_ownership(agency_number)
    # elif ownership_type == 'multipleOwners':
    #     commercial_reg_number = ownership_info.get('ownerIDNumber')
    #     return validate_property_multiple_ownership(commercial_reg_number)
    
    # Return a mock success response
    return True

# def validate_property_individual_ownership(deed_number, national_id):
#     url = f"https://api.wathq.sa/moj/real-estate/deed/{deed_number}/{national_id}/National_ID"
    
#     try:
#         response = requests.get(url, headers=api_headers)
#         response.raise_for_status()
#         return response.json()
#     except requests.exceptions.HTTPError as http_err:
#         print(f"HTTP error occurred: {http_err}")  # Log the error if needed
#         return None
#     except Exception as err:
#         print(f"Other error occurred: {err}")  # Log the error if needed
#         return None

# def validate_property_agency_ownership(agency_number):
#     url = f"https://api.wathq.sa/v1/attorney/info/{agency_number}"
#     try:
#         response = requests.get(url, headers=api_headers)
#         response.raise_for_status()
#         return response.json()
#     except requests.exceptions.HTTPError as http_err:
#         print(f"HTTP error occurred: {http_err}")
#         return None
#     except Exception as err:
#         print(f"Other error occurred: {err}")
#         return None

# def validate_property_multiple_ownership(commercial_reg_number):
#     url = f"https://api.wathq.sa/v5/commercialregistration/info/{commercial_reg_number}"
    
#     try:
#         response = requests.get(url, headers=api_headers)
#         response.raise_for_status()
#         return response.json()
#     except requests.exceptions.HTTPError as http_err:
#         print(f"HTTP error occurred: {http_err}")
#         return None
#     except Exception as err:
#         print(f"Other error occurred: {err}")
#         return None
