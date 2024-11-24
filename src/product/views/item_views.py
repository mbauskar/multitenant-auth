from rest_framework import permissions
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

from product.models import Item
from product.permissions import IsAdminOrReadOnly
from product.models.serializers import ItemSerializer


class ItemViewSet(ModelViewSet):
    """
    ViewSet to manage Item objects.
    Admin users can view, add, edit, and disable items.
    Regular users can only view items.
    """

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        """
        Ensure only Admin users can create items.
        """
        if not self.request.user.groups.filter(name="Admin").exists():
            raise permissions.PermissionDenied(
                "You do not have permission to add items."
            )
        serializer.save()

    def perform_update(self, serializer):
        """
        Ensure only Admin users can edit items.
        """
        if not self.request.user.groups.filter(name="Admin").exists():
            raise permissions.PermissionDenied(
                "You do not have permission to edit items."
            )
        serializer.save()

    @action(detail=True, methods=["post"])
    def disable(self, request, pk=None):
        """
        Custom action to disable an item (is_disabled=True).
        """
        if not request.user.groups.filter(name="Admin").exists():
            raise permissions.PermissionDenied(
                "You do not have permission to disable items."
            )

        item = get_object_or_404(Item, pk=pk)
        item.is_disabled = True
        item.save()
        return Response({"status": "Item disabled successfully!"})
