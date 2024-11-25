import os

from django.conf import settings
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class Home(APIView):
    permission_classes = [AllowAny]

    def get(request, *args, **kwargs):
        """serve the react build index.html"""
        index_path = os.path.join(
            settings.BASE_DIR.parent, "static", "tenant-ui", "dist", "index.html"
        )
        if not os.path.exists(index_path):
            return HttpResponse("React build not found", status=404)

        with open(index_path, "r") as f:
            return HttpResponse(f.read(), content_type="text/html")
