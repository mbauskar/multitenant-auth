from django.urls import path

from product.views.item_views import FetchItemView

urlpatterns = [path("products", FetchItemView.as_view())]
