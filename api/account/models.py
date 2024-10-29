import uuid
from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser
from django.utils import timezone
from .managers.UserManager import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    password_hash = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    registration_date = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True, blank=True)
    phone_verified = models.BooleanField(default=False)
    preferences = models.JSONField(null=True, blank=True)
    subscription_plan_id = models.IntegerField(null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number']

    def __str__(self):
        return (f"User: {self.user_id}, Email: {self.email}, Phone Verified: {self.phone_verified}, "
                f"PhoneNumber: {self.phone_number}, Name: {self.name}, subscription_plan_id: {self.subscription_plan_id}")

    def active_sessions(self):
        """Returns all active sessions for this user."""
        return self.sessions.filter(end_time__isnull=True)

    def all_sessions(self):
        """Returns all sessions for this user, active or ended."""
        return self.sessions.all()

class UserSession(models.Model):
    session_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions', null=True, blank=True)
    guest_id = models.CharField(max_length=255, null=True, blank=True)
    start_time = models.DateTimeField(default=timezone.now)
    last_heartbeat = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(null=True, blank=True)
    duration_seconds = models.IntegerField(null=True, blank=True)

    def update_heartbeat(self):
        """Updates the session's last heartbeat timestamp."""
        self.last_heartbeat = timezone.now()
        self.save(update_fields=['last_heartbeat'])

    def end_session(self):
        """Ends the session and calculates the duration."""
        self.end_time = timezone.now()
        if self.start_time:
            self.duration_seconds = int((self.end_time - self.start_time).total_seconds())
        self.save(update_fields=['end_time', 'duration_seconds'])

    def __str__(self):
        return f"Session {self.session_id} for user {self.user or self.guest_id}"
