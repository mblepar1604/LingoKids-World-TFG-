from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, PerfilInfantil, Progreso  # Asegúrate de importar tanto User como PerfilInfantil

# Registro del modelo User con una clase personalizada
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'es_padre', 'es_infantil', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('es_padre', 'es_infantil')}),
    )

# Registra el modelo User con la clase CustomUserAdmin
admin.site.register(User, CustomUserAdmin)

admin.site.register(Progreso)

# Registro del modelo PerfilInfantil
@admin.register(PerfilInfantil)
class PerfilInfantilAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'edad', 'usuario_padre', 'avatar']
