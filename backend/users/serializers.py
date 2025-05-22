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
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        nombre = validated_data.pop('nombre', None)
        edad = validated_data.pop('edad', None)
        user = User.objects.create_user(**validated_data)
        if user.es_infantil and nombre and edad:
            PerfilInfantil.objects.create(
                usuario_padre=None,
                nombre=nombre,
                edad=edad
            )
        return user

class ChildSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'parent']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Creamos el niño con es_infantil=True
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            es_infantil=True
        )
        # Vinculamos al padre
        user.parent = self.context['request'].user
        user.save()
        return user

class ConfiguracionParentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracionParental
        fields = ['idioma', 'limite_tiempo', 'accesibilidad']