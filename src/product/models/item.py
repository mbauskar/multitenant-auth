from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=250)
    price = models.DecimalField(
        default=0.0, db_default=0.0, max_digits=10, decimal_places=2
    )
    is_disabled = models.BooleanField(default=False, db_default=False)
