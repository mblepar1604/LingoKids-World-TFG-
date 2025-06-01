from rest_framework import serializers
from .models import TipoJuego, Juego

class TipoJuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoJuego
        fields = [
            'id',
            'nombre',
            'descripcion',
            'icono',
            'nivel_dificultad',
            'edad_minima',
            'edad_maxima'
        ]

class JuegoSerializer(serializers.ModelSerializer):
    # Incluimos el nombre legible del tipo de juego como campo de solo lectura
    tipo_nombre = serializers.CharField(source='tipo.nombre', read_only=True)
    
    class Meta:
        model = Juego
        fields = [
            'id',
            'titulo',
            'descripcion',
            'tipo',
            'tipo_nombre',
            'contenido',
            'idioma',
            'imagen',
            'activo',
            'fecha_creacion'
        ]