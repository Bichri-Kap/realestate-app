from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """
    Allows read for anyone, write only for admins/staff.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_staff


class IsOwnerOrAdmin(BasePermission):
    """
    Users can only access their own objects.
    Admins can access everything.
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        # If the object is a User instance, compare directly
        if isinstance(obj, request.user.__class__):
            return obj == request.user
        # Otherwise, fallback to obj.user
        return getattr(obj, 'user', None) == request.user


class IsReviewOwnerOrAdmin(BasePermission):
    """
    Users can edit/delete their own review.
    Admin can do anything.
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        return obj.reviewer == request.user


class IsReadOnly(BasePermission):
    """
    Completely read-only for all users.
    """

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to allow only owners of an object to edit it.
    Read-only access is allowed for everyone.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return getattr(obj, 'user', None) == request.user


class IsAgentOrReadOnly(BasePermission):
    """
    Allow only agents to create or modify properties.
    Read-only access for everyone else.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and getattr(
            request.user, "is_agent", False
        )


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff
