from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

from product.models import Product
from product.permissions import IsAdminOrReadOnly
from product.models.product_serializers import ProductSerializer


class ProductViewSet(ModelViewSet):
    """
    ViewSet to manage Product objects.
    Admin users can view, add, edit, and disable products.
    Regular users can only view products.
    """

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        """create new product"""
        serializer.save()

    def perform_update(self, serializer):
        """update the product, ignore the is_disabled field"""
        product = serializer.validated_data

        # ignore the is_disabled if it was sent in the update payload
        if "is_disabled" in product:
            product.pop("is_disabled")

        serializer.save(**product)

    @action(detail=True, methods=["post"])
    def disable(self, request, pk=None):
        """Custom action to disable an product (is_disabled=True)."""
        product = get_object_or_404(Product, pk=pk)
        if product.is_disabled:
            return Response({"error": "Product is already disabled"}, status=400)

        product.is_disabled = True
        product.save()
        return Response({"status": "Product disabled successfully!"})

    @action(detail=True, methods=["post"])
    def enable(self, request, pk=None):
        """Custom action to disable an product (is_disabled=False)."""
        product = get_object_or_404(Product, pk=pk)
        if product.is_disabled:
            return Response({"error": "Product is already enabled"}, status=400)

        product.is_disabled = False
        product.save()
        return Response({"status": "Product enabled successfully!"})
