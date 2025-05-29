from django.db import models
from django.contrib.auth.models import User

class Progreso(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='progreso')
    cuentos_leidos = models.IntegerField(default=0)
    total_cuentos = models.IntegerField(default=0)
    juegos_jugados = models.IntegerField(default=0)
    total_juegos = models.IntegerField(default=0)
    horas_juegos = models.FloatField(default=0.0)
    horas_cuentos = models.FloatField(default=0.0)
    horas_totales = models.FloatField(default=0.0)

    idiomas = models.JSONField(default=dict)  # Ejemplo: {"es": {"cuentos_leidos": 5, "juegos_jugados": 3}}

    def __str__(self):
        return f"Progreso de {self.usuario.username}"
