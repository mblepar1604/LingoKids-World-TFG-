from django.db import models
from users.models import PerfilInfantil

class Logro(models.Model):
    """
    Define un logro. Puede ser:
      - Asociado a un JUEGO (campo juego_id != null)
      - Asociado a un CUENTO (campo cuento_id != null)
      - Opción extra: puede haber logros genéricos si ambos son null
    """

    codigo = models.CharField(
        max_length=50,
        unique=True,
        help_text="Código interno único del logro (ej. 'snake_10_manzanas', 'cuento1_leido', etc.)"
    )

    titulo = models.CharField(
        max_length=100,
        help_text="Título legible para el usuario (ej. '¡Maestro de la Serpiente!')."
    )

    descripcion = models.TextField(
        help_text="Texto explicativo de cómo se desbloquea este logro."
    )

    # Si el logro aplica a un juego específico, se guarda aquí (ej. id=5 para SnakeGame)
    juego_id = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="ID del juego (tabla juegos_juego) al que aplica este logro, si corresponde."
    )

    # Si el logro aplica a un cuento específico, se guarda aquí (ej. id=3 para Cuento con pk=3)
    cuento_id = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="ID del cuento (tabla cuentos_cuento) al que aplica este logro, si corresponde."
    )

    # Umbral numérico: si es un logro de juego, interpretable como 'apple_count', 'max_round', etc.
    # Si es un logro de cuento, lo usaremos como 'umbral de tiempo_leido' (segundos), o umbral genérico.
    umbral = models.PositiveIntegerField(
        default=0,
        help_text="Valor numérico mínimo para desbloquear, dependiendo de si es juego o cuento."
    )

    activo = models.BooleanField(
        default=True,
        help_text="Si está True, aparece en la lista de logros disponibles; si False, no se muestra."
    )

    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.titulo} (código={self.codigo})"


class PerfilLogro(models.Model):
    """
    Registra qué logros ha desbloqueado cada PerfilInfantil.
    """

    perfil_infantil = models.ForeignKey(
        PerfilInfantil,
        on_delete=models.CASCADE,
        related_name='logros_desbloqueados'
    )
    logro = models.ForeignKey(
        Logro,
        on_delete=models.CASCADE,
        related_name='perfiles'
    )
    fecha_desbloqueado = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('perfil_infantil', 'logro')

    def __str__(self):
        return f"{self.perfil_infantil.nombre} desbloqueó {self.logro.codigo} el {self.fecha_desbloqueado}"