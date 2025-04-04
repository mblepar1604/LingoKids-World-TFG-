from django.contrib import admin
from .models import PerfilInfantil

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'es_padre', 'es_infantil', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('es_padre', 'es_infantil')}),
    )

admin.site.register(User, CustomUserAdmin)

@admin.register(PerfilInfantil)
class PerfilInfantilAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'edad', 'usuario_padre', 'avatar']
