from django.contrib import admin
from .models import ComponenteAvatar, Avatar, Recompensa, RecompensaPerfil

@admin.register(ComponenteAvatar)
class ComponenteAvatarAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'color', 'precio', 'desbloqueado')
    list_filter = ('tipo', 'desbloqueado')
    search_fields = ('nombre', 'descripcion')
    list_editable = ('precio', 'desbloqueado')

@admin.register(Avatar)
class AvatarAdmin(admin.ModelAdmin):
    list_display = ('perfil', 'pelo', 'ojos', 'ropa', 'fecha_actualizacion')
    list_filter = ('fecha_creacion', 'fecha_actualizacion')
    search_fields = ('perfil__nombre',)
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion')

@admin.register(Recompensa)
class RecompensaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'puntos', 'componente_desbloquea')
    list_filter = ('tipo',)
    search_fields = ('nombre', 'descripcion')
    list_editable = ('puntos',)

@admin.register(RecompensaPerfil)
class RecompensaPerfilAdmin(admin.ModelAdmin):
    list_display = ('perfil', 'recompensa', 'fecha_obtencion')
    list_filter = ('fecha_obtencion', 'recompensa__tipo')
    search_fields = ('perfil__nombre', 'recompensa__nombre')
    readonly_fields = ('fecha_obtencion',) 