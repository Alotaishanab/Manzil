# messaging/views.py

from rest_framework import generics, permissions, filters
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated

from account.models import User
from .models import Message, PinnedConversation
from .serializers import MessageSerializer
from rest_framework import status
from rest_framework.views import APIView



class StandardResultsSetPagination(PageNumberPagination):
    # Return 15 messages per page by default
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 100


class ConversationListAPIView(generics.ListAPIView):
    """
    GET: Return one row per conversation, with the last message for each "partner".
         The user is either sender or receiver.
    """
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None  # We only want the last message for each partner, no pagination
    serializer_class = MessageSerializer  # Not directly used, because we'll build a custom JSON

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['body', 'sender__email', 'receiver__email']
    ordering_fields = ['timestamp', 'status']

    def get_queryset(self):
        """
        We'll fetch all messages where the user is sender or receiver,
        sorted by newest first. We'll group by the "other" user to find
        each conversation's last message.
        """
        user = self.request.user
        return (
            Message.objects
            .filter(Q(sender=user) | Q(receiver=user))
            .exclude(hidden_for=user)
            .select_related('sender', 'receiver')
            .order_by('-timestamp')  # newest first
        )

    def list(self, request, *args, **kwargs):
        all_messages = self.get_queryset()

        # Dictionary key = partner_id, value = newest message for that partner
        conversation_map = {}
        pinned_partner_ids = request.user.pinned_conversations.values_list('partner_id', flat=True)

        for msg in all_messages:
            # Identify "the other user" in this conversation
            if msg.sender == request.user:
                partner = msg.receiver
            else:
                partner = msg.sender

            partner_id = partner.pk
            # If we haven't stored a conversation for this partner, do so now
            if partner_id not in conversation_map:
                conversation_map[partner_id] = msg
                # first time = newest message, because we sorted descending

        # Build a custom response list
        data = []
        for partner_id, last_msg in conversation_map.items():
            # the partner in that last_msg
            if last_msg.sender == request.user:
                # So partner = last_msg.receiver
                partner_obj = last_msg.receiver
            else:
                partner_obj = last_msg.sender

            data.append({
                "partner_id": partner_obj.pk,
                "partner_name": partner_obj.name,
                "pinned": partner_obj.pk in pinned_partner_ids,
                "partner_profile_picture": partner_obj.profile_picture,
                "last_message_body": last_msg.body,
                "last_message_timestamp": last_msg.timestamp,
                "last_message_status": last_msg.status,
            })

        return Response(data)


class SentMessageListView(generics.ListAPIView):
    """
    GET: List all sent messages by the authenticated user.
    """
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination  # If you want pagination for sent messages
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['body', 'receiver__email']
    ordering_fields = ['timestamp', 'status']

    def get_queryset(self):
        user = self.request.user
        return (
            Message.objects
            .filter(sender=user)
            .exclude(hidden_for=user)
            .select_related('sender', 'receiver')
            .order_by('-timestamp')  # Or ascending as needed
        )


class ChatListAPIView(generics.ListAPIView):
    """
    GET: List all messages where the authenticated user is either sender or receiver,
         optionally filtered by partner_id (and property_id).
         Paginated -> 15 messages per page.
    """
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['body', 'sender__email', 'receiver__email']
    ordering_fields = ['timestamp', 'status']

    def get_queryset(self):
        user = self.request.user
        qs = (
            Message.objects
            .filter(Q(sender=user) | Q(receiver=user))
            .exclude(hidden_for=user)  # Properly exclude hidden messages
            .select_related('sender', 'receiver')
        )

        # Exclude self-chats
        qs = qs.exclude(Q(sender=user, receiver=user))

        # Partner filter
        partner_id = self.request.query_params.get('partner_id')
        if partner_id:
            qs = qs.filter(
                Q(sender__pk=partner_id) | 
                Q(receiver__pk=partner_id)
            )

        # Property filter
        property_id = self.request.query_params.get('property_id')
        if property_id:
            qs = qs.filter(property__id=property_id)

        return qs.order_by('timestamp')
    

class HideChatForUserView(generics.ListAPIView):
    """
    POST or DELETE: Mark all messages in the conversation with partner_id
    as hidden_for the request.user, effectively removing it from their inbox
    without deleting from the DB.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request, partner_id):
        user = request.user
        # find all messages between user & partner_id
        messages = Message.objects.filter(
            Q(sender=user, receiver__pk=partner_id) | 
            Q(sender__pk=partner_id, receiver=user)
        )
        # Mark them hidden for this user
        for msg in messages:
            msg.hidden_for.add(user)
        return Response({"detail": "Conversation hidden (soft-deleted) for user."}, status=status.HTTP_200_OK)


class PinConversationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, partner_id):
        try:
            # Ensure partner_id is converted to integer
            partner = User.objects.get(pk=int(partner_id))
        except (User.DoesNotExist, ValueError):
            return Response(
                {"detail": "User not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Verify conversation exists
        has_conversation = Message.objects.filter(
            Q(sender=request.user, receiver=partner) |
            Q(sender=partner, receiver=request.user)
        ).exists()
        
        if not has_conversation:
            return Response(
                {"detail": "No conversation exists with this user."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Toggle pin status
        try:
            pin, created = PinnedConversation.objects.get_or_create(
                user=request.user,
                partner=partner
            )
            if not created:
                pin.delete()
                action = 'unpinned'
            else:
                action = 'pinned'
        except Exception as e:
            return Response(
                {"detail": "Error updating pin status"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({
            "detail": f"Conversation {action} successfully.",
            "pinned": action == 'pinned'
        }, status=status.HTTP_200_OK)