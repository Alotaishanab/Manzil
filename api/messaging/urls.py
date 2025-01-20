# messaging/urls.py

from django.urls import path
from .views import ReceivedMessageListCreateView, SentMessageListView, ChatListAPIView

urlpatterns = [
    path('received/', ReceivedMessageListCreateView.as_view(), name='received-messages'),
    path('sent/', SentMessageListView.as_view(), name='sent-messages'),
    path('chats/', ChatListAPIView.as_view(), name='chat-list'),
]
