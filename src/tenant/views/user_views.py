from django.forms import ValidationError
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from django.contrib.auth.models import User, Group
from rest_framework.permissions import AllowAny

from product.permissions import IsAdminOrReadOnly
from tenant.models.user_serializers import UserSerializer


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        """signup a new user"""
        email = request.data.get("email")
        username = request.data.get("username")
        password = request.data.get("password")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        if not all([email, username, password]):
            return Response({"error": "mandatory fields are missing"})

        if User.objects.filter(Q(username=username) | Q(email=email)).exists():
            return Response(
                {"error": "A user with this username or email already exists."}
            )

        user = User(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save()
        user.groups.add(*Group.objects.filter(name="User"))
        return Response(
            {
                "email": user.email,
                "username": user.username,
                "last_name": user.last_name,
                "first_name": user.first_name,
                "roles": ["User"],
            }
        )


class UserViewSet(ModelViewSet):
    """
    ViewSet to manage User objects.
    Admin users can view, add, edit, and disable users.
    Regular users can only view users.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        """
        Limit the queryset so that non-admin users can only retrieve their own profile.
        """
        if self.request.user.groups.filter(name="Admin").exists():
            # Admin can see all users
            return User.objects.all()

        # Non-admin users can only see their own profile
        return User.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        """create new item"""
        username = serializer.validated_data.get("username")
        email = serializer.validated_data.get("email")
        if User.objects.filter(Q(username=username) | Q(email=email)).exists():
            raise ValidationError(
                {"username": "A user with this username already exists."}
            )

        user = serializer.save()
        user.groups.add(*Group.objects.filter(name="User"))

    def perform_update(self, serializer):
        """update the item, ignore the is_disabled field"""
        item = serializer.validated_data

        # ignore the is_disabled if it was sent in the update payload
        fields_to_ignore = ["is_active", "password", "username", "date_joined"]
        for field in fields_to_ignore:
            if field not in item:
                continue

            item.pop(field)

        serializer.save(**item)

    @action(detail=False, methods=["get"])
    def me(self, request, pk=None):
        """Custom action to disable an item (is_disabled=True)."""
        return Response(
            {
                "email": request.user.email,
                "username": request.user.username,
                "last_name": request.user.last_name,
                "first_name": request.user.first_name,
                "roles": list(request.user.groups.values_list("name", flat=True)),
            }
        )
