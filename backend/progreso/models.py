from django.db import models
from users.models import PerfilInfantil
from juegos.models import Juego
from cuentos.models import Cuento

class ProgresoGeneral(models.Model):
    """
    Guarda, para cada PerfilInfantil, el tiempo total (suma de juegos + cuentos).
    """
    perfil_infantil = models.OneToOneField(
        PerfilInfantil,
        on_delete=models.CASCADE,
        related_name='progreso_general'
    )
    tiempo_total = models.IntegerField(
        default=0,
        help_text="Tiempo total en la app, en segundos"
    )
    tiempo_juegos = models.IntegerField(
        default=0,
        help_text="Tiempo dedicado a juegos, en segundos"
    )
    tiempo_cuentos = models.IntegerField(
        default=0,
        help_text="Tiempo dedicado a cuentos, en segundos"
    )
    actualizado = models.DateTimeField(
        auto_now=True,
        help_text="Última vez que se actualizó este registro"
    )

    def __str__(self):
        return f"ProgresoGeneral: {self.perfil_infantil.nombre} - Total: {self.tiempo_total}s"

class ProgresoJuego(models.Model):
    """
    Para cada juego que un niño juegue, guarda:
      - cuánto tiempo lleva jugado (en total)
      - un JSON con estadísticas específicas (rondas completadas, puntaje máximo, nivel máximo, etc.).
    """
    perfil_infantil = models.ForeignKey(
        PerfilInfantil,
        on_delete=models.CASCADE,
        related_name='progresos_juegos'
    )
    juego = models.ForeignKey(
        Juego,
        on_delete=models.CASCADE,
        related_name='progresos'
    )
    tiempo_jugado = models.IntegerField(
        default=0,
        help_text="Tiempo total jugado en este juego, en segundos"
    )
    estadisticas = models.JSONField(
        default=dict,
        blank=True,
        help_text="JSON con llaves específicas del juego, ej: {'rondas_completas': 3, 'ptje_max': 1500}"
    )
    actualizado = models.DateTimeField(
        auto_now=True,
        help_text="Última vez que se modificó"
    )

    class Meta:
        unique_together = ('perfil_infantil', 'juego')
        verbose_name = "Progreso de Juego"
        verbose_name_plural = "Progresos de Juegos"

    def __str__(self):
        return f"{self.perfil_infantil.nombre} - {self.juego.titulo} : {self.tiempo_jugado}s"

class ProgresoCuento(models.Model):
    """
    Para cada cuento que un niño lea, guarda:
      - tiempo_leido: cuántos segundos lleva leyendo ese cuento
      - pag_actual: página en la que está (opcional, por si se rastrea página)
      - completado: si ya terminó de leerlo
    """
    perfil_infantil = models.ForeignKey(
        PerfilInfantil,
        on_delete=models.CASCADE,
        related_name='progresos_cuentos'
    )
    cuento = models.ForeignKey(
        Cuento,
        on_delete=models.CASCADE,
        related_name='progresos_cuentos'
    )
    tiempo_leido = models.IntegerField(
        default=0,
        help_text="Cuántos segundos lleva leyendo este cuento"
    )
    pag_actual = models.IntegerField(
        default=0,
        help_text="Página actual en la que va el niño"
    )
    completado = models.BooleanField(
        default=False,
        help_text="Si el niño completó el cuento o no"
    )
    actualizado = models.DateTimeField(
        auto_now=True,
        help_text="Última vez que se modificó"
    )

    class Meta:
        unique_together = ('perfil_infantil', 'cuento')
        verbose_name = "Progreso de Cuento"
        verbose_name_plural = "Progresos de Cuentos"

    def __str__(self):
        estado = "✓" if self.completado else "✗"
        return f"{self.perfil_infantil.nombre} - {self.cuento.titulo} : {self.tiempo_leido}s {estado}"
