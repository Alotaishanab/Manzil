from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from . import user_serializers


@api_view(["POST"])
def add_property(request):
    if request.method == 'POST':
        serializer = user_serializers.AddUserPropertySerializer(
            data=request.data)
        if serializer.is_valid():
            print("Hello")
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
