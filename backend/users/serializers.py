from rest_framework import serializers
from .models import User, PerfilInfantil, ConfiguracionParental

class PerfilInfantilSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilInfantil
        fields = ['id', 'nombre', 'edad', 'avatar']
        read_only_fields = ['avatar']

class RegistroSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(required=False)
    edad = serializers.IntegerField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'es_padre', 'es_infantil', 'nombre', 'edad']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        nombre = validated_data.pop('nombre', None)
        edad = validated_data.pop('edad', None)
        user = User.objects.create_user(**validated_data)

        if user.es_infantil and nombre and edad:
            PerfilInfantil.objects.create(
                usuario_padre=None,  # Enlazarlo con el padre real cuando se implemente endpoint para que un padre (autenticado con JWT) cree perfiles infantiles
                nombre=nombre,
                edad=edad
            )
        return user

class ConfiguracionParentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracionParental
        fields = ['idioma', 'limite_tiempo', 'accesibilidad']