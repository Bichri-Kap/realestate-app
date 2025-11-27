from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Agent


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ("email", "is_staff", "is_active")
    search_fields = ("email",)
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
        ("Groups", {"fields": ("groups",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "is_staff", "is_active"),
            },
        ),
    )


@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ["user", "company_name", "phone", "location", "rating"]
    search_fields = ["user__username", "company_name", "phone"]
