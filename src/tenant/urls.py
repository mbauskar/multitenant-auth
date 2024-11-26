from django.urls import path
from rest_framework.routers import DefaultRouter

from tenant.views.auth_view import LoginView, LogoutView, HeartbeatView
from tenant.views.user_views import SignupView, UserViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("signup", SignupView.as_view(), name="signup"),
    path("heartbeat", HeartbeatView.as_view(), name="signup"),
    path("logout", LogoutView.as_view(), name="login"),
] + router.urls
