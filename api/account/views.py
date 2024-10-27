import uuid
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserLogoutSerializer,
    UserSessionEndSerializer,
    UserSessionStartSerializer,
    UserVerifyPhoneSerializer,
    UserRegisterPhoneSerializer,
    UserChangePasswordSerializer
)
from .jwt_utils import generate_token, blacklist_token
from .models import User, UserSession
from .verify import send_code, check_code
from django.utils import timezone
from django.contrib.auth import authenticate

from .permissions import IsAuthenticatedOrGuest

@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            existing_user = User.objects.filter(email=email).first()

            if existing_user:
                token_obj = generate_token(existing_user)
                return Response({
                    "token": token_obj,
                    "user": {"id": existing_user.user_id, "email": existing_user.email}
                }, status=status.HTTP_200_OK)

            user = serializer.save()
            token_obj = generate_token(user)

            return Response({
                "token": token_obj,
                "user": {"id": user.user_id, "email": user.email}
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def register_user_phone_number(request):
    if request.method == 'POST':
        serializer = UserRegisterPhoneSerializer(data=request.data)
        if serializer.is_valid():
            user_id = request.user.user_id
            phone = serializer.validated_data.get('phone')

            phone_user = User.objects.filter(phone_number=phone).exclude(user_id=user_id).first()
            if phone_user:
                return Response({"detail": "Phone is already registered with a user"}, status=status.HTTP_400_BAD_REQUEST)

            existing_user = User.objects.filter(user_id=user_id).first()
            if not existing_user:
                return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            existing_user.phone_number = phone
            existing_user.save(update_fields=['phone_number'])

            send_code(phone)
            return Response({"message": "Code sent"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def resend_phone_code(request):
    if request.method == 'POST':
        user_id = request.user.user_id
        user = User.objects.filter(user_id=user_id).first()
        if user:
            if user.phone_number:
                send_code(user.phone_number)
                return Response({"message": "Resent code"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "User has no phone registered"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
def logout_user(request):
    if request.method == 'POST':
        serializer = UserLogoutSerializer(data=request.data)
        if serializer.is_valid():
            blacklist_token(serializer.validated_data.get('refresh'))
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            existing_user = User.objects.filter(email=email).first()

            if existing_user:
                if not existing_user.phone_verified:
                    return Response({"detail": "Phone is not verified"}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            user = authenticate(email=email, password=password)
            if not user:
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            token_obj = generate_token(existing_user)

            existing_user.last_login = timezone.now()
            existing_user.save(update_fields=['last_login'])

            return Response({
                "token": token_obj,
                "user": {"id": existing_user.user_id, "email": existing_user.email}
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
def verify_code(request):
    if request.method == 'POST':
        serializer = UserVerifyPhoneSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = request.user.phone_number
            verification_code = serializer.validated_data.get('verification_code')

            try:
                user = User.objects.get(phone_number=phone_number)
            except User.DoesNotExist:
                return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            if check_code(phone_number, verification_code):
                user.phone_verified = True
                user.save()
                return Response({"message": "Phone is verified"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def change_user_password(request):
    if request.method == 'POST':
        serializer = UserChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            current_password = serializer.validated_data['currentPassword']
            new_password = serializer.validated_data['password']
            user_id = request.user.user_id
            user = User.objects.filter(user_id=user_id).first()

            if user:
                if not user.check_password(current_password):
                    return Response({"detail": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(new_password)
                user.save()
                return Response({"message": "Password changed"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def get_user_info(request):
    if request.method == 'GET':
        user = request.user

        if not user:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        user_data = {
            "id": user.user_id,
            "email": user.email,
            "name": user.name,
        }

        return Response(user_data, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([AllowAny])
def refresh_access_token(request):
    refresh_token = request.data.get('refresh')

    if not refresh_token:
        return Response({"detail": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        refresh = RefreshToken(refresh_token)
        new_access = str(refresh.access_token)
        return Response({"access": new_access}, status=status.HTTP_200_OK)
    except (TokenError, InvalidToken) as e:
        return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

class StartUserSessionView(APIView):
    permission_classes = [IsAuthenticatedOrGuest]

    def post(self, request, format=None):
        serializer = UserSessionStartSerializer(data=request.data)
        if serializer.is_valid():
            guest_id = serializer.validated_data.get('guest_id')
            user = request.user if request.user.is_authenticated else None

            session = UserSession.objects.create(
                user=user,
                guest_id=guest_id
            )

            return Response({
                'message': 'Session started',
                'session_id': str(session.session_id),
                'start_time': session.start_time
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SessionHeartbeatView(APIView):
    permission_classes = [IsAuthenticatedOrGuest]

    def post(self, request, format=None):
        session_id = request.data.get('session_id')
        if not session_id:
            return Response({'error': 'Session ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            session = UserSession.objects.get(session_id=session_id)
            session.update_heartbeat()
            return Response({'message': 'Heartbeat received'}, status=status.HTTP_200_OK)
        except UserSession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

class EndUserSessionView(APIView):
    permission_classes = [IsAuthenticatedOrGuest]

    def post(self, request, format=None):
        serializer = UserSessionEndSerializer(data=request.data)
        if serializer.is_valid():
            session_id = serializer.validated_data['session_id']
            try:
                session = UserSession.objects.get(session_id=session_id)
                session.end_session()
                return Response({
                    'message': 'Session ended',
                    'session_id': str(session.session_id),
                    'duration_seconds': session.duration_seconds,
                    'end_time': session.end_time
                }, status=status.HTTP_200_OK)
            except UserSession.DoesNotExist:
                return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
