from django.db import models
from django.conf import settings
from users.models import PerfilInfantil

class TipoJuego(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    icono = models.ImageField(upload_to='tipos_juegos/', null=True, blank=True)
    nivel_dificultad = models.IntegerField(
        choices=[(1, 'Fácil'), (2, 'Medio'), (3, 'Difícil')]
    )
    edad_minima = models.IntegerField()
    edad_maxima = models.IntegerField()
    
    def __str__(self):
        return self.nombre


class Juego(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    tipo = models.ForeignKey(
        TipoJuego,
        on_delete=models.CASCADE,
        related_name='juegos'
    )
    contenido = models.JSONField(
        default=dict,
        blank=True,
        help_text="JSON con la lógica interna del juego (niveles, palabras, etc.)"
    )
    idioma = models.CharField(
        max_length=2,
        choices=[('es', 'Español'), ('en', 'English')]
    )
    imagen = models.ImageField(upload_to='juegos/', null=True, blank=True)
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.titulo} ({self.tipo.nombre})"


class EstadisticaJuego(models.Model):
    """
    Estadísticas agregadas (a nivel global) para cada juego.
    Ejemplo: promedio de puntuaciones, tiempo promedio, etc.
    """
    juego = models.ForeignKey(
        Juego,
        on_delete=models.CASCADE,
        related_name='estadisticas'
    )
    total_jugadores = models.IntegerField(default=0)
    promedio_puntuacion = models.FloatField(default=0.0)
    tiempo_promedio = models.IntegerField(default=0)  # en segundos
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Estadísticas de {self.juego.titulo}"