# websocket/routing.py
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/interactions/', consumers.InteractionLoggingConsumer.as_asgi()),
]
