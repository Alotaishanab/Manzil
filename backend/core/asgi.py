# core/asgi.py
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Import routing after setting DJANGO_SETTINGS_MODULE
from channels.routing import ProtocolTypeRouter, URLRouter
import messaging.routing
import analytics.routing
from .middleware import TokenAuthMiddleware

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": TokenAuthMiddleware(
        URLRouter(
            messaging.routing.websocket_urlpatterns +
            analytics.routing.websocket_urlpatterns
        )
    ),
})
