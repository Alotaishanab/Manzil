# pagination.py
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

class PropertyPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

    def get_paginated_response(self, data):
        return Response({
            'count': self.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'properties': data
        })
