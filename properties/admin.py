from django.contrib import admin
from .models import Property, PropertyImage, PropertyCategory, Province, Area


# This lets you edit Property Images inline for each property
class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'city', 'bedrooms')
    inlines = [PropertyImageInline]


admin.site.register(PropertyImage)
admin.site.register(PropertyCategory)
admin.site.register(Province)
admin.site.register(Area)
