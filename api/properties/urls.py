from . import user_views

urlpatterns = [
    path('user/properties', user_views.add_property),
]
