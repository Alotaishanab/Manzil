from . import user_views
from django.urls import path

urlpatterns = [
    path('add', user_views.add_property),
    path('explore/near-by', user_views.explore_properties_by_location),
    path('explore/interested', user_views.explore_properties_by_interests),
    path('property/<int:property_id>', user_views.get_property_by_id),
    path('<int:property_id>/save', user_views.save_property),
    path('user/saved-properties', user_views.get_user_saved_properties),

]
