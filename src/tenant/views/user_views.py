from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from django.contrib.auth.models import User

from product.permissions import IsAdminOrReadOnly
from tenant.models.user_serializers import UserSerializer


class UserViewSet(ModelViewSet):
    """
    ViewSet to manage User objects.
    Admin users can view, add, edit, and disable users.
    Regular users can only view users.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        """
        Limit the queryset so that non-admin users can only retrieve their own profile.
        """
        if self.request.user.groups.filter(name="Admin").exists():
            # Admin can see all users
            return User.objects.all()

        # Non-admin users can only see their own profile
        return User.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        """create new item"""
        # todo: check for dupicate user
        serializer.save()

    def perform_update(self, serializer):
        """update the item, ignore the is_disabled field"""
        item = serializer.validated_data

        # ignore the is_disabled if it was sent in the update payload
        fields_to_ignore = ["is_active", "password", "username", "date_joined"]
        for field in fields_to_ignore:
            if field not in item:
                continue

            item.pop(field)

        serializer.save(**item)

    @action(detail=False, methods=["get"])
    def me(self, request, pk=None):
        """Custom action to disable an item (is_disabled=True)."""
        return Response(UserSerializer(request.user).data)
