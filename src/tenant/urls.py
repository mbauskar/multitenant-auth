from django.urls import path
from rest_framework.routers import DefaultRouter

from tenant.views.auth_view import LoginView, LogoutView
from tenant.views.user_views import UserViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("logout", LogoutView.as_view(), name="login"),
] + router.urls
