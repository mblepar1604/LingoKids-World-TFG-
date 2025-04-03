# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    es_padre = models.BooleanField(default=False)
    es_infantil = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class PerfilInfantil(models.Model):
    usuario_padre = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='perfiles_infantiles'
    )
    nombre = models.CharField(max_length=100)
    edad = models.PositiveIntegerField()
    avatar = models.CharField(max_length=100, default='avatar_default_1')

    def __str__(self):
        return f"{self.nombre} (Hijo/a de {self.usuario_padre.username})"