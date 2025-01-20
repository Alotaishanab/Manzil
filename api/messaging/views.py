# messaging/views.py

from rest_framework import generics, permissions, filters
from .models import Message
from .serializers import MessageSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # Messages per page
    page_size_query_param = 'page_size'
    max_page_size = 100

class ReceivedMessageListCreateView(generics.ListCreateAPIView):
    """
    GET: List all received messages for the authenticated user.
    POST: Send a new message.
    """
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['body', 'sender__email']  # Removed 'subject'
    ordering_fields = ['timestamp', 'status']

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(receiver=user).select_related('sender', 'receiver')

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

class SentMessageListView(generics.ListAPIView):
    """
    GET: List all sent messages by the authenticated user.
    """
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['body', 'receiver__email']  # Removed 'subject'
    ordering_fields = ['timestamp', 'status']

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(sender=user).select_related('sender', 'receiver')


class ChatListAPIView(generics.ListAPIView):
    """
    GET: List all messages where the authenticated user is either sender or receiver.
         (You can group them by conversation partner on the client side.)
    """
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['body', 'sender__email', 'receiver__email']
    ordering_fields = ['timestamp', 'status']

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(
            (Q(sender=user) | Q(receiver=user)) &
            ~Q(sender=user, receiver=user)  # Exclude self chats
        ).select_related('sender', 'receiver').order_by('-timestamp')
