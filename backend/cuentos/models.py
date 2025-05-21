from django.db import models

# Create your models here.
class Cuento(models.Model):
    idioma = models.CharField(max_length=50)
    titulo = models.CharField(max_length=200)
    contenido = models.JSONField(help_text="Estructura del cuento: escenas, diálogos, elecciones, etc.")
    personalizable = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.titulo} ({self.idioma})"