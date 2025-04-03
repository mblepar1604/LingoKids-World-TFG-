# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    es_padre = models.BooleanField(default=False)
    es_infantil = models.BooleanField(default=False)

    def __str__(self):
        return self.username
