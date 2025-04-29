from rest_framework import serializers
from .models import TipoJuego, Juego, ProgresoJuego, EstadisticaJuego

class TipoJuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoJuego
        fields = ['id', 'nombre', 'descripcion', 'icono', 'nivel_dificultad', 'edad_minima', 'edad_maxima']

class JuegoSerializer(serializers.ModelSerializer):
    tipo_nombre = serializers.CharField(source='tipo.nombre', read_only=True)
    
    class Meta:
        model = Juego
        fields = ['id', 'titulo', 'descripcion', 'tipo', 'tipo_nombre', 'contenido', 'idioma', 'imagen', 'activo', 'fecha_creacion']

class ProgresoJuegoSerializer(serializers.ModelSerializer):
    juego_titulo = serializers.CharField(source='juego.titulo', read_only=True)
    juego_tipo = serializers.CharField(source='juego.tipo.nombre', read_only=True)
    
    class Meta:
        model = ProgresoJuego
        fields = ['id', 'perfil_infantil', 'juego', 'juego_titulo', 'juego_tipo', 'puntuacion', 'nivel_completado', 'tiempo_jugado', 'fecha_ultima_partida', 'completado']

class EstadisticaJuegoSerializer(serializers.ModelSerializer):
    juego_titulo = serializers.CharField(source='juego.titulo', read_only=True)
    
    class Meta:
        model = EstadisticaJuego
        fields = ['id', 'juego', 'juego_titulo', 'total_jugadores', 'promedio_puntuacion', 'tiempo_promedio', 'fecha_actualizacion'] 