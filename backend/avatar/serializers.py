from rest_framework import serializers
from .models import ComponenteAvatar, Avatar

class ComponenteAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponenteAvatar
        fields = ['id', 'nombre', 'descripcion', 'tipo', 'imagen', 'color', 'precio', 'desbloqueado']

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = ['id', 'pelo', 'ojos', 'ropa', 'accesorio', 'vista_previa']
