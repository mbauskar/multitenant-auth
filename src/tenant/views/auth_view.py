from rest_framework import status
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated


class LoginView(APIView):
    """login to application using user name and password"""

    permission_classes = [AllowAny]

    def post(self, request):
        """login to application using username and password"""
        username = request.data.get("username")
        password = request.data.get("password")

        # Validate input
        if not username or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Respond with user details and CSRF token
            login(request, user)
            return Response(
                {
                    "message": "Login successful",
                    "profile": {
                        "email": user.email,
                        "username": user.username,
                        "last_name": user.last_name,
                        "first_name": user.first_name,
                        "roles": list(user.groups.values_list("name", flat=True)),
                    },
                },
                status=status.HTTP_200_OK,
            )

        # Return an error response if authentication fails
        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """logout from the application"""
        logout(request)
        return Response(
            {"message": "Successfully logged out"}, status=status.HTTP_200_OK
        )
