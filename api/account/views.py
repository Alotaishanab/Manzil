import uuid
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
import logging
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserLogoutSerializer,
    UserSessionEndSerializer,
    UserSessionStartSerializer,
    UserVerifyPhoneSerializer,
    UserRegisterPhoneSerializer,
    UserChangePasswordSerializer,
    UserProfilePictureSerializer
)
from .jwt_utils import generate_token, blacklist_token
from .models import User, UserSession
from .verify import send_code, check_code
from django.utils import timezone
from django.contrib.auth import authenticate
from properties.utils import upload_to_s3
from .permissions import IsAuthenticatedOrGuest

logger = logging.getLogger(__name__)


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
        
class UpdateProfilePictureView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, format=None):
        """
        Handle uploading or updating the profile picture.
        """
        serializer = UserProfilePictureSerializer(data=request.data)
        if serializer.is_valid():
            profile_picture = serializer.validated_data.get('profile_picture', None)
            user = request.user

            if profile_picture:
                # Generate a unique file name
                file_extension = profile_picture.name.split('.')[-1]
                file_name = f"{uuid.uuid4()}.{file_extension}"

                # Upload to S3
                s3_url = upload_to_s3(profile_picture, file_name, 'profile_pics')

                if s3_url:
                    user.profile_picture = s3_url
                    user.save(update_fields=['profile_picture'])
                    logger.info(f"User {user.user_id} updated profile picture.")
                    return Response({"profile_picture": s3_url}, status=status.HTTP_200_OK)
                else:
                    logger.error(f"Failed to upload profile picture for user {user.user_id}.")
                    return Response({"error": "Failed to upload profile picture."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                # If no profile_picture provided, do not update
                return Response({"error": "No profile picture provided."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        """
        Handle removing the profile picture.
        """
        user = request.user
        if user.profile_picture:
            user.profile_picture = None
            user.save(update_fields=['profile_picture'])
            logger.info(f"User {user.user_id} removed profile picture.")
            return Response({"message": "Profile picture removed."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No profile picture to remove."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def logout_user(request):
    if request.method == 'POST':
        serializer = UserLogoutSerializer(data=request.data)
        if serializer.is_valid():
            refresh_token = serializer.validated_data.get('refresh')
            try:
                blacklist_token(refresh_token)
                return Response(status=status.HTTP_204_NO_CONTENT)
            except TokenError:
                # Already expired or invalid => treat as “already logged out” or unauthorized
                return Response(
                    {"detail": "Refresh token is invalid or already expired."},
                    status=status.HTTP_401_UNAUTHORIZED
                )
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
        print("DEBUG: request.user:", user)

        # If user isn't authenticated or doesn't exist
        if not user or user.is_anonymous:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Safely map each attribute, falling back to None if not present
        user_data = {
            "id": user.user_id or None,
            "email": user.email or None,
            "name": user.name or None,
            "profile_picture": user.profile_picture or None,
        }
        print("DEBUG: returning user_data:", user_data)

        return Response(user_data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def refresh_access_token(request):
    refresh_token = request.data.get('refresh')

    if not refresh_token:
        return Response({"detail": "Refresh token is required"}, 
                      status=status.HTTP_400_BAD_REQUEST)

    try:
        refresh = RefreshToken(refresh_token)
        user_id = refresh.payload.get('user_id')
        
        try:
            user = User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found"},
                          status=status.HTTP_404_NOT_FOUND)

        # Generate new tokens
        new_refresh = RefreshToken.for_user(user)
        new_access = str(new_refresh.access_token)
        
        # Blacklist old token
        refresh.blacklist()

        return Response({
            "access": new_access,
            "refresh": str(new_refresh)
        }, status=status.HTTP_200_OK)

    except (TokenError, InvalidToken) as e:
        return Response({"detail": str(e)},
                      status=status.HTTP_401_UNAUTHORIZED)

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

            logger.info(f"Session started: session_id={session.session_id}, user={user}, guest_id={guest_id}")

            return Response({
                'message': 'Session started',
                'session_id': str(session.session_id),
                'start_time': session.start_time
            }, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Session start failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SessionHeartbeatView(APIView):
    permission_classes = [IsAuthenticatedOrGuest]

    def post(self, request, format=None):
        session_id = request.data.get('session_id')
        guest_id = request.data.get('guest_id')
        user = request.user if request.user.is_authenticated else None
        logger.debug(f"Heartbeat request received with session_id: {session_id}, user: {user}, guest_id: {guest_id}")

        # Ensure session_id is present
        if not session_id:
            logger.warning("Heartbeat attempt without session_id")
            return Response({'error': 'Session ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Query by user if authenticated, otherwise by guest_id
            if user:
                session = UserSession.objects.get(session_id=session_id, user=user)
                logger.info(f"Authenticated heartbeat for session {session_id} and user {user}")
            elif guest_id:
                session = UserSession.objects.get(session_id=session_id, guest_id=guest_id)
                logger.info(f"Guest heartbeat for session {session_id} and guest {guest_id}")
            else:
                # If neither user nor guest_id is found, return an error
                logger.warning("Heartbeat attempt without valid user or guest_id")
                return Response({'error': 'User or Guest ID required for heartbeat.'}, status=status.HTTP_400_BAD_REQUEST)

            # Update session heartbeat
            session.update_heartbeat()
            logger.debug(f"Session {session_id} heartbeat updated at {session.last_heartbeat}")

            return Response({'message': 'Heartbeat received'}, status=status.HTTP_200_OK)

        except UserSession.DoesNotExist:
            logger.warning(f"Heartbeat received for non-existent session {session_id}")
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)





class EndUserSessionView(APIView):
    permission_classes = [IsAuthenticatedOrGuest]

    def post(self, request, format=None):
        session_id = request.data.get('session_id')
        guest_id = request.data.get('guest_id')
        user = request.user if request.user.is_authenticated else None
        logger.debug(f"End session request received with session_id: {session_id}, user: {user}, guest_id: {guest_id}")

        if not session_id:
            logger.warning("End session attempt without session_id")
            return Response({'error': 'Session ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if user:
                session = UserSession.objects.get(session_id=session_id, user=user)
                logger.info(f"Ending authenticated session {session_id} for user {user}")
            elif guest_id:
                session = UserSession.objects.get(session_id=session_id, guest_id=guest_id)
                logger.info(f"Ending guest session {session_id} for guest {guest_id}")
            else:
                logger.warning("End session attempt without valid user or guest_id")
                return Response({'error': 'User or Guest ID required to end session.'}, status=status.HTTP_400_BAD_REQUEST)

            session.delete()
            logger.debug(f"Session {session_id} terminated.")

            return Response({'message': 'Session ended successfully.'}, status=status.HTTP_200_OK)

        except UserSession.DoesNotExist:
            logger.warning(f"End session attempt for non-existent session {session_id}")
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)