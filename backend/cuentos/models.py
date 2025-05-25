from django.db import models

class Cuento(models.Model):
    idioma = models.CharField(max_length=50)
    titulo = models.CharField(max_length=200)
    categoria = models.CharField(max_length=100, default='General')  # ⬅️ Nueva categoría
    imagen = models.CharField(max_length=255, blank=True)  # ⬅️ Nueva imagen
    contenido = models.JSONField(help_text="Estructura del cuento: escenas, diálogos, elecciones, etc.")
    personalizable = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.titulo} ({self.idioma})"
