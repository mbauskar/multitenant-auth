# Generated by Django 5.1.3 on 2024-11-25 15:14

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [
        ("product", "0002_alter_item_price"),
    ]

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=250, unique=True)),
                (
                    "price",
                    models.DecimalField(
                        db_default=0.0, decimal_places=2, default=0.0, max_digits=10
                    ),
                ),
                ("is_disabled", models.BooleanField(db_default=False, default=False)),
            ],
        ),
        migrations.DeleteModel(
            name="Item",
        ),
    ]