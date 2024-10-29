# backend/account/permissions.py

from rest_framework.permissions import BasePermission

class IsAuthenticatedOrGuest(BasePermission):
    """
    Allows access to authenticated users or guests based on guest_id.
    """

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        # Allow access if 'guest_id' is present
        guest_id = request.data.get('guest_id')
        return guest_id is not None
