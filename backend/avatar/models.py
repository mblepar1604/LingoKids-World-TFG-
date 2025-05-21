from django.db import models
from users.models import PerfilInfantil
from .utils import save_avatar_preview

class ComponenteAvatar(models.Model):
    """Modelo base para los componentes del avatar (pelo, ojos, etc.)"""
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='avatar/componentes/')
    tipo = models.CharField(max_length=50, choices=[
        ('pelo', 'Pelo'),
        ('ojos', 'Ojos'),
        ('ropa', 'Ropa'),
        ('accesorio', 'Accesorio')
    ])
    color = models.CharField(max_length=50, null=True, blank=True)  # Para pelo y ojos
    precio = models.IntegerField(default=0)  # Para comprar con recompensas
    desbloqueado = models.BooleanField(default=False)  # Si está disponible por defecto

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.nombre}"

    class Meta:
        ordering = ['tipo', 'nombre']

class Avatar(models.Model):
    """Modelo para el avatar personalizado de cada perfil infantil"""
    perfil = models.OneToOneField(PerfilInfantil, on_delete=models.CASCADE, related_name='avatar_personalizado')
    pelo = models.ForeignKey(ComponenteAvatar, on_delete=models.SET_NULL, null=True, related_name='avatares_pelo')
    ojos = models.ForeignKey(ComponenteAvatar, on_delete=models.SET_NULL, null=True, related_name='avatares_ojos')
    ropa = models.ForeignKey(ComponenteAvatar, on_delete=models.SET_NULL, null=True, related_name='avatares_ropa')
    accesorio = models.ForeignKey(ComponenteAvatar, on_delete=models.SET_NULL, null=True, blank=True, related_name='avatares_accesorio')
    vista_previa = models.ImageField(upload_to='avatar/previews/', null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Avatar de {self.perfil.nombre}"

    def actualizar_vista_previa(self):
        """Actualiza la vista previa del avatar"""
        if self.pelo or self.ojos or self.ropa or self.accesorio:
            self.vista_previa = save_avatar_preview(self)
            self.save()

    def save(self, *args, **kwargs):
        """Sobrescribe el método save para actualizar la vista previa"""
        super().save(*args, **kwargs)
        self.actualizar_vista_previa()

class Recompensa(models.Model):
    """Modelo para las recompensas que se pueden ganar"""
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='avatar/recompensas/')
    puntos = models.IntegerField(default=0)  # Puntos que otorga
    tipo = models.CharField(max_length=50, choices=[
        ('logro', 'Logro'),
        ('actividad', 'Actividad'),
        ('diario', 'Diario'),
        ('especial', 'Especial')
    ])
    componente_desbloquea = models.ForeignKey(ComponenteAvatar, on_delete=models.SET_NULL, null=True, blank=True, 
                                             related_name='recompensas_desbloqueo')

    def __str__(self):
        return self.nombre

class RecompensaPerfil(models.Model):
    """Modelo para registrar las recompensas ganadas por cada perfil"""
    perfil = models.ForeignKey(PerfilInfantil, on_delete=models.CASCADE, related_name='recompensas')
    recompensa = models.ForeignKey(Recompensa, on_delete=models.CASCADE, related_name='perfiles')
    fecha_obtencion = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('perfil', 'recompensa')

    def __str__(self):
        return f"{self.recompensa.nombre} - {self.perfil.nombre}" 