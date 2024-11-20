# messaging/urls.py

from django.urls import path
from .views import ReceivedMessageListCreateView, SentMessageListView

urlpatterns = [
    path('received/', ReceivedMessageListCreateView.as_view(), name='received-messages'),
    path('sent/', SentMessageListView.as_view(), name='sent-messages'),
]
