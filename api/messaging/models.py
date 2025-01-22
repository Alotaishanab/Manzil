# messaging/models.py

import uuid
from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL  # Reference to the custom User model

class Message(models.Model):
    STATUS_CHOICES = [
        ('sent', 'Sent'),
        ('delivered', 'Delivered'),
        ('read', 'Read'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='sent')
    hidden_for = models.ManyToManyField(User, related_name='hidden_messages', blank=True)
    pinned_by = models.ManyToManyField(User, related_name='pinned_messages', blank=True)



    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['sender', 'receiver']),
            models.Index(fields=['timestamp']),
        ]

    def __str__(self):
        return f"From {self.sender.email} to {self.receiver.email} at {self.timestamp}"

class PinnedConversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pinned_conversations')
    partner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pinned_by_users')
    pinned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'partner')
        ordering = ['-pinned_at']

    def __str__(self):
        return f"{self.user.email} pinned chat with {self.partner.email}"