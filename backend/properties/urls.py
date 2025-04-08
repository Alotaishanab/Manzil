from . import user_views
from django.urls import path

urlpatterns = [
    path('add/', user_views.add_property),
    path('explore/near-by/', user_views.explore_properties_by_location),
    path('explore/interested/', user_views.explore_properties_by_interests),
    path('property/<int:property_id>/', user_views.get_property_by_id),
    path('<int:property_id>/save/', user_views.save_property),
    path('user/saved-properties/', user_views.get_user_saved_properties),
    path('user/my-properties/', user_views.get_user_properties),
    path('user/my-properties/<int:property_id>/make-featured/', user_views.make_property_featured),
    path('map-coordinates/', user_views.get_properties_map_coordinates),
    path('<int:property_id>/update-step/', user_views.update_property_step),
]
