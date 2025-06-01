from django.contrib import admin
from .models import TipoJuego, Juego, EstadisticaJuego

@admin.register(TipoJuego)
class TipoJuegoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'nivel_dificultad', 'edad_minima', 'edad_maxima']
    list_filter = ['nivel_dificultad']
    search_fields = ['nombre', 'descripcion']

@admin.register(Juego)
class JuegoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'tipo', 'idioma', 'activo', 'fecha_creacion']
    list_filter = ['tipo', 'idioma', 'activo']
    search_fields = ['titulo', 'descripcion']

@admin.register(EstadisticaJuego)
class EstadisticaJuegoAdmin(admin.ModelAdmin):
    list_display = ['juego', 'total_jugadores', 'promedio_puntuacion', 'tiempo_promedio']
    list_filter = ['juego__tipo']
    search_fields = ['juego__titulo']
