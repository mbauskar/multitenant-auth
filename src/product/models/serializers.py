from rest_framework import serializers

from product.models.item import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "name", "price", "is_disabled"]
