from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_staff",
            "is_active",
            "date_joined",
            "role",
        ]

    def get_role(self, instance):
        """return the role assigned to user"""
        return ", ".join(list(instance.groups.values_list("name", flat=True)))
