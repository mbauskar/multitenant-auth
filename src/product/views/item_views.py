from django.http import JsonResponse
from django.forms import model_to_dict
from django.views import View

from product.models import Item


class FetchItemView(View):
    def get(request, *args, **kwargs):
        items = Item.objects.all()
        return JsonResponse({"items": [model_to_dict(item) for item in items]})
