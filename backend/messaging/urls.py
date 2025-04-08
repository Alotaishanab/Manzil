# messaging/urls.py

from django.urls import path
from .views import ConversationListAPIView, SentMessageListView, ChatListAPIView, HideChatForUserView, PinConversationView

urlpatterns = [
    path('conversations/', ConversationListAPIView.as_view(), name='conversations-messages'),
    path('sent/', SentMessageListView.as_view(), name='sent-messages'),
    path('chats/', ChatListAPIView.as_view(), name='chat-list'),
    path('chats/<int:partner_id>/hide_for_user/', HideChatForUserView.as_view(), name='hide-chat'),
    path('conversations/<int:partner_id>/pin/', PinConversationView.as_view(), name='pin-conversation'),
]
