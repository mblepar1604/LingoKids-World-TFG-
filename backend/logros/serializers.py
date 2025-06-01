from rest_framework import serializers
from .models import Logro, PerfilLogro

class LogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logro
        fields = [
            'id',
            'codigo',
            'titulo',
            'descripcion',
            'juego_id',
            'cuento_id',
            'umbral',
            'activo',
            'fecha_creacion'
        ]
        read_only_fields = ['fecha_creacion']


class PerfilLogroSerializer(serializers.ModelSerializer):
    logro = LogroSerializer(read_only=True)

    class Meta:
        model = PerfilLogro
        fields = [
            'id',
            'perfil_infantil',
            'logro',
            'fecha_desbloqueado'
        ]
        read_only_fields = ['fecha_desbloqueado']