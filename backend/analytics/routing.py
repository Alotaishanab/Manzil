# analytics/routing.py

from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'^ws/log-interactions/$', consumers.InteractionLoggingConsumer.as_asgi()),
]
