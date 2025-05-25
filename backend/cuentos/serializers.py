from rest_framework import serializers
from .models import Cuento

class CuentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuento
        fields = [
            'id',
            'titulo',
            'categoria',
            'idioma',
            'imagen',  # usamos el campo directamente
            'contenido',
            'personalizable',
        ]
