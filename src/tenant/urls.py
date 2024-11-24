from rest_framework.routers import DefaultRouter

from tenant.views.user_views import UserViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")

urlpatterns = router.urls
