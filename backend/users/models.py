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

class Progreso(models.Model):
    idioma = models.CharField(max_length=100)
    logros = models.TextField()  # Descripción de logros
    tiempo = models.IntegerField()  # Tiempo en minutos, por ejemplo
    fecha_creacion = models.DateTimeField(auto_now_add=True)  # Fecha de creación del progreso
    perfil_infantil = models.ForeignKey('PerfilInfantil', related_name='progresos', on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Progreso de {self.perfil_infantil.usuario_padre.username} en {self.idioma}"
    
class ConfiguracionParental(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    idioma = models.CharField(max_length=5, choices=[("es", "Español"), ("en", "Inglés"), ("fr", "Francés")], default="es")
    limite_tiempo = models.PositiveIntegerField(default=30)
    accesibilidad = models.BooleanField(default=False)

    def __str__(self):
        return f"Configuración de {self.usuario.username}"