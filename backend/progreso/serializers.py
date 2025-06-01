from rest_framework import serializers
from .models import ProgresoGeneral, ProgresoJuego, ProgresoCuento

class ProgresoGeneralSerializer(serializers.ModelSerializer):
    """
    Serializer para manejar el progreso global de un perfil infantil.
    """
    perfil_id = serializers.IntegerField(
        source='perfil_infantil.id',
        read_only=True
    )

    class Meta:
        model = ProgresoGeneral
        fields = [
            'perfil_infantil',
            'perfil_id',
            'tiempo_total',
            'tiempo_juegos',
            'tiempo_cuentos',
            'actualizado'
        ]

class ProgresoJuegoSerializer(serializers.ModelSerializer):
    """
    Serializer para manejar el progreso en cada juego.
    """
    perfil_id = serializers.IntegerField(
        source='perfil_infantil.id',
        read_only=True
    )
    juego_id = serializers.IntegerField(
        source='juego.id',
        read_only=True
    )

    class Meta:
        model = ProgresoJuego
        fields = [
            'perfil_infantil',
            'perfil_id',
            'juego',
            'juego_id',
            'tiempo_jugado',
            'estadisticas',
            'actualizado'
        ]

class ProgresoCuentoSerializer(serializers.ModelSerializer):
    """
    Serializer para manejar el progreso en cada cuento.
    """
    perfil_id = serializers.IntegerField(
        source='perfil_infantil.id',
        read_only=True
    )
    cuento_id = serializers.IntegerField(
        source='cuento.id',
        read_only=True
    )

    class Meta:
        model = ProgresoCuento
        fields = [
            'perfil_infantil',
            'perfil_id',
            'cuento',
            'cuento_id',
            'tiempo_leido',
            'pag_actual',
            'completado',
            'actualizado'
        ]