
from django.urls import path

from websocket import views

urlpatterns = [
    path('', views.index, name='index'),
]
