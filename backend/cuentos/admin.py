from django.contrib import admin
from .models import Cuento

# Register your models here.
@admin.register(Cuento)
class CuentoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'idioma', 'personalizable']