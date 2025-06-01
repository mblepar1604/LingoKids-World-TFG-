import json
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Logro, PerfilLogro
from progreso.models import ProgresoJuego, ProgresoCuento
from users.models import PerfilInfantil


@receiver(post_save, sender=ProgresoJuego)
def asignar_logro_al_guardar_progreso_juego(sender, instance, created, **kwargs):
    """
    Cada vez que se guarde un ProgresoJuego:
    - Recupera perfil_infantil y el ID del juego.
    - Revisa en Logro todos los logros activos con campo juego_id = instance.juego.id.
    - Compara las estadísticas (pairs_found, max_round, apple_count, etc.) contra el umbral.
    - Si cumple y no existía antes un PerfilLogro para ese perfil+logro, lo crea.
    """
    perfil = instance.perfil_infantil
    juego_id = instance.juego.id
    estadisticas = instance.estadisticas or {}

    logros_candidatos = Logro.objects.filter(
        juego_id=juego_id,
        activo=True
    )

    for logro in logros_candidatos:
        umbral = logro.umbral
        desbloquea = False

        # Según el juego_id, interpretamos un campo distinto de 'estadisticas'
        if juego_id == 1:  # MatchingGame
            valor = estadisticas.get("pairs_found", 0)
            if isinstance(valor, (int, float)) and valor >= umbral:
                desbloquea = True

        elif juego_id == 2:  # MemoryGame
            valor = estadisticas.get("matches_found", 0)
            if isinstance(valor, (int, float)) and valor >= umbral:
                desbloquea = True

        elif juego_id == 3:  # PuzzleGame
            valor = estadisticas.get("completado", False)
            # Para Puzzle usamos umbral=1 como “se completó al menos una vez”
            if isinstance(valor, bool) and valor and umbral == 1:
                desbloquea = True

        elif juego_id == 4:  # SimonGame
            valor = estadisticas.get("max_round", 0)
            if isinstance(valor, (int, float)) and valor >= umbral:
                desbloquea = True

        elif juego_id == 5:  # SnakeGame
            valor = estadisticas.get("apple_count", 0)
            if isinstance(valor, (int, float)) and valor >= umbral:
                desbloquea = True

        elif juego_id == 6:  # WhackAMole
            valor = estadisticas.get("score", 0)
            if isinstance(valor, (int, float)) and valor >= umbral:
                desbloquea = True

        if not desbloquea:
            continue

        # Comprobar si ya existía el PerfilLogro para ese perfil+logro
        existe = PerfilLogro.objects.filter(
            perfil_infantil=perfil,
            logro=logro
        ).exists()
        if not existe:
            PerfilLogro.objects.create(
                perfil_infantil=perfil,
                logro=logro
            )


@receiver(post_save, sender=ProgresoCuento)
def asignar_logro_al_guardar_progreso_cuento(sender, instance, created, **kwargs):
    """
    Cada vez que se guarde un ProgresoCuento:
    - Recupera perfil_infantil y el ID del cuento.
    - Revisa en Logro todos los logros activos con campo cuento_id = instance.cuento.id.
    - Compara 'tiempo_leido' o 'completado' contra umbral.
    - Si cumple y no existía antes un PerfilLogro para ese perfil+logro, lo crea.
    """
    perfil = instance.perfil_infantil
    cuento_id = instance.cuento.id
    tiempo_leido = instance.tiempo_leido or 0
    completado = instance.completado

    # Filtramos todos los logros que tengan cuento_id = este cuento y estén activos
    logros_candidatos = Logro.objects.filter(
        cuento_id=cuento_id,
        activo=True
    )

    for logro in logros_candidatos:
        umbral = logro.umbral
        desbloquea = False

        # Interpretamos que:
        #  - si el logro.umbral > 0, entonces lo comparamos con 'tiempo_leido' (en segundos)
        #  - si el logro.umbral == 0, interpretamos que el criterio es 'completado == True'
        if umbral > 0:
            # Desbloquea si ha acumulado al menos umbral segundos leyendo este cuento
            if isinstance(tiempo_leido, int) and tiempo_leido >= umbral:
                desbloquea = True
        else:
            # Umbral == 0 → entendemos que basta con que completado sea True
            if isinstance(completado, bool) and completado:
                desbloquea = True

        if not desbloquea:
            continue

        # Si no existía antes el perfil_logro para perfil+logro, lo creamos
        existe = PerfilLogro.objects.filter(
            perfil_infantil=perfil,
            logro=logro
        ).exists()
        if not existe:
            PerfilLogro.objects.create(
                perfil_infantil=perfil,
                logro=logro
            )