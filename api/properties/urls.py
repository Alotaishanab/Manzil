from . import user_views
from django.urls import path

urlpatterns = [
    path('add', user_views.add_property),
]
