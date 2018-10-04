from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):

    name = models.CharField(blank=True, max_length=128)

    def __str__(self):
        return self.name
