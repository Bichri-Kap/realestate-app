"""
URL configuration for realestate project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from properties.views import PropertyViewSet, ListingTypeViewSet, PropertyTypeViewSet
from accounts.views import UserViewSet
from bookings.views import BookingViewSet
from reviews.views import PropertyReviewViewSet


router = routers.DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'users', UserViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'reviews', PropertyReviewViewSet)
router.register(r'listing-types', ListingTypeViewSet, basename='listingtype')
router.register(r'property-types', PropertyTypeViewSet, basename='propertytype')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # JWT Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
