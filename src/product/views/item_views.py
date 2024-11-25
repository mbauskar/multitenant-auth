from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

from product.models import Item
from product.permissions import IsAdminOrReadOnly
from product.models.item_serializers import ItemSerializer


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
        """create new item"""
        serializer.save()

    def perform_update(self, serializer):
        """update the item, ignore the is_disabled field"""
        item = serializer.validated_data

        # ignore the is_disabled if it was sent in the update payload
        if "is_disabled" in item:
            item.pop("is_disabled")

        serializer.save(**item)

    @action(detail=True, methods=["post"])
    def disable(self, request, pk=None):
        """Custom action to disable an item (is_disabled=True)."""
        item = get_object_or_404(Item, pk=pk)
        item.is_disabled = True
        item.save()
        return Response({"status": "Item disabled successfully!"})

    @action(detail=True, methods=["post"])
    def enable(self, request, pk=None):
        """Custom action to disable an item (is_disabled=False)."""
        item = get_object_or_404(Item, pk=pk)
        item.is_disabled = False
        item.save()
        return Response({"status": "Item enabled successfully!"})
