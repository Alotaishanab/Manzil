from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserLogoutSerializer, UserVerifyPhoneSerializer
from .jwt_utils import generate_token


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        try:
            if serializer.is_valid():
                user = serializer.save()
                token_obj = generate_token(user)
                return Response(token_obj, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            error_code = e.detail.get('email', [{}]).pop(
            ).code if 'email' in e.detail else None

            if error_code == 'phone_verified':
                return Response({'detail': 'Email is registered and phone verified. Redirect to login.'}, status=status.HTTP_302_FOUND)
            elif error_code == 'phone_not_verified':
                return Response({'detail': 'Email is registered but phone not verified. Redirect to phone verification.'}, status=status.HTTP_409_CONFLICT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def logout_user(request):
    if request.method == 'POST':
        serializer = UserLogoutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token_obj = generate_token(user)
            return Response(token_obj, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def verify_code(request):
    if request.method == 'POST':
        serializer = UserVerifyPhoneSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "Phone is verified"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
