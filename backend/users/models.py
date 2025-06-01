from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    es_padre = models.BooleanField(default=False)
    es_infantil = models.BooleanField(default=False)
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='children'
    )

    def __str__(self):
        return self.username

class PerfilInfantil(models.Model):
    usuario_padre = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='perfiles_infantiles'
    )
    user_infantil = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='perfil_infantil', 
        null=True)
    nombre = models.CharField(max_length=100)
    edad = models.PositiveIntegerField()
    avatar = models.CharField(max_length=100, default='avatar_default_1')

    def __str__(self):
        return f"{self.nombre} (Hijo/a de {self.usuario_padre.username})"

class Progreso(models.Model):
    idioma = models.CharField(max_length=100)
    logros = models.TextField()
    tiempo = models.IntegerField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    perfil_infantil = models.ForeignKey(
        'PerfilInfantil',
        related_name='progresos',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"Progreso de {self.perfil_infantil.usuario_padre.username} en {self.idioma}"

class ConfiguracionParental(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    idioma = models.CharField(
        max_length=5,
        choices=[("es", "Español"), ("en", "Inglés"), ("fr", "Francés")],
        default="es"
    )
    limite_tiempo = models.PositiveIntegerField(default=30)
    accesibilidad = models.BooleanField(default=False)

    def __str__(self):
        return f"Configuración de {self.usuario.username}"

from avatar.models import Avatar, ComponenteAvatar

@receiver(post_save, sender=PerfilInfantil)
def crear_avatar_por_defecto(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'avatar_personalizado'):
        pelo = ComponenteAvatar.objects.filter(tipo='pelo', desbloqueado=True).first()
        ojos = ComponenteAvatar.objects.filter(tipo='ojos', desbloqueado=True).first()
        ropa = ComponenteAvatar.objects.filter(tipo='ropa', desbloqueado=True).first()
        accesorio = ComponenteAvatar.objects.filter(tipo='accesorio', desbloqueado=True).first()

        if pelo and ojos and ropa:
            Avatar.objects.create(
                perfil=instance,
                pelo=pelo,
                ojos=ojos,
                ropa=ropa,
                accesorio=accesorio  # puede ser None
            )