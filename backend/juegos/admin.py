from django.contrib import admin
from .models import TipoJuego, Juego, ProgresoJuego

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

@admin.register(ProgresoJuego)
class ProgresoJuegoAdmin(admin.ModelAdmin):
    list_display = ['perfil_infantil', 'juego', 'puntuacion', 'nivel_completado', 'completado', 'fecha_ultima_partida']
    list_filter = ['completado', 'juego__tipo']
    search_fields = ['perfil_infantil__nombre', 'juego__titulo']
