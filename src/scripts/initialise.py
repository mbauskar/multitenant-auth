# setup the application for initial setup

import random

from django.contrib.auth import get_user_model
from django_tenants.utils import (
    tenant_context,
    get_tenant_model,
    get_tenant_domain_model,
)
from django.contrib.auth.models import Group

from product.models import Product

User = get_user_model()
Domain = get_tenant_domain_model()
Client = get_tenant_model()


def create_groups():
    """create the admin and user group"""
    admin = Group(name="Admin")
    user = Group(name="User")
    admin.save()
    user.save()
    return admin, user


def create_products(scheme_name):
    """create random products for the tenant / schema"""
    products = []
    for idx in range(15):
        products.append(
            Product(
                price=round(random.uniform(10.5, 20.9), 2),
                name="product {0} - {1}".format(idx, scheme_name).title(),
            )
        )

    try:
        Product.objects.bulk_create(products)
    except Exception as excp:
        print(f"Product creation failed. Error: [{excp}]")
        return

    print("Product creation successful !!!!")


def create_superuser(group, tenant_name=""):
    """create the superuser for the tenant"""
    try:
        lastname = "Doe" if not tenant_name else "Doe ({0})".format(tenant_name).strip()
        global_superuser = User.objects.create_superuser(
            is_staff=True,
            first_name="Jane",
            is_superuser=True,
            last_name=lastname,
            username="jane.doe",
            password="qwerty123",
            email="jane.doe@example.com",
        )
        global_superuser.groups.add(group)
        print("Created user: ", global_superuser)
    except Exception as excp:
        print(f"Failed to create user, error: [{excp}]")


def setup():
    """create tenants and products for the application"""
    for schema_name, name in [
        ["acme", "Acme Corp"],
        ["skynet", "Skynet Corp"],
    ]:
        if Client.objects.filter(schema_name=schema_name).exists():
            # tenant already exists
            continue

        tenant = Client(
            name=name,
            schema_name=schema_name,
        )
        tenant.save()
        Domain.objects.get_or_create(
            tenant=tenant,
            is_primary=True,
            domain=f"{tenant.schema_name}.localhost".lower(),
        )
        with tenant_context(tenant):
            admin, user = create_groups()
            create_products(tenant.schema_name)
            create_superuser(admin, tenant.schema_name)


def run(*args):
    setup()
