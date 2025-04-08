from django.contrib import admin

from properties.models import Property, PropertyView, PropertyClick

# Register your models here.
admin.site.register(Property)
admin.site.register(PropertyView)
admin.site.register(PropertyClick)