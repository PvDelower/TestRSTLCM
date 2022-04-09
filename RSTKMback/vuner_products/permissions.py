from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsOwnerOrReadOnlyOrAdmin(BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """

    def has_object_permission(self, request, view, obj):
        return bool(
            request.method in SAFE_METHODS
            or request.user
            and request.user.is_authenticated
            and (obj.owner == request.user or request.user.is_staff)
        )
