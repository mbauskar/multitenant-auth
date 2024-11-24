from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow Admins to perform any action.
    Other users can only view items.
    """

    def has_permission(self, request, view):
        # Allow only logged in user
        if not request.user or not request.user.is_authenticated:
            return False

        # fetch all the user group assigned to the user
        user_groups = list(request.user.groups.values_list("name", flat=True))
        if not user_groups:
            # if there are no group assigned then do not allow to view, edit or disable
            # resourse
            return False

        # Allow safe methods (GET, HEAD, OPTIONS) for all users
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check if user is in the Admin group for write operations
        return "Admin" in user_groups
