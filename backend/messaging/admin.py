# messaging/admin.py

from django.contrib import admin
from .models import Message

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'status', 'timestamp')  # Removed 'subject'
    list_filter = ('status', 'timestamp', 'sender', 'receiver')  # Removed 'subject' if present
    search_fields = ('body', 'sender__email', 'receiver__email')  # Removed 'subject'
