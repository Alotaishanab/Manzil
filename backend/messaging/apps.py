# messaging/apps.py

from django.apps import AppConfig

class MessagingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'messaging'
    label = 'messaging_app'  # Unique label to prevent conflicts
