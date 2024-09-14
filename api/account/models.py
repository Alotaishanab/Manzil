from django.db import models
from django.contrib.auth.models import PermissionsMixin, BaseUserManager
from django.contrib.auth.base_user import AbstractBaseUser
from .managers.UserManager import UserManager
from django.utils import timezone


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
        return f"User: {self.user_id}, Email: {self.email}, Phone Verified: {self.phone_verified}, PhoneNumber: {self.phone_number}, Name: {self.name}, subscription_plan_id: {self.subscription_plan_id}"
