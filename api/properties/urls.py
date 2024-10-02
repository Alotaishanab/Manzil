from . import user_views
from django.urls import path

urlpatterns = [
    path('add', user_views.add_property),
    path('explore/near-by', user_views.explore_properties_by_location)
]
