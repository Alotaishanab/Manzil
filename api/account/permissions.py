# account/permissions.py

from rest_framework import permissions

class IsAuthenticatedOrGuest(permissions.BasePermission):
    """
    Custom permission to allow authenticated users or guests with a guest_id to start a session.
    """

    def has_permission(self, request, view):
        # Allow access if the user is authenticated or if the request has 'guest_id' in data.
        return bool(request.user.is_authenticated or 'guest_id' in request.data)
