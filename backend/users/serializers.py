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
    # Ahora usamos first_name y last_name para nombre y apellidos
    first_name = serializers.CharField(write_only=True, required=True)
    last_name  = serializers.CharField(write_only=True, required=True)
    edad = serializers.IntegerField(write_only=True, required=True)

    # El campo parent se asigna automáticamente
    parent = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = User
        # Incluimos first_name, last_name y edad
        fields = ['id', 'username', 'password', 'parent', 'first_name', 'last_name', 'edad']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Extraemos first_name, last_name y edad
        first_name = validated_data.pop('first_name')
        last_name  = validated_data.pop('last_name')
        edad       = validated_data.pop('edad')

        # 1) Creamos el User con es_infantil=True y asignamos nombre y apellidos
        user = User.objects.create_user(
            username      = validated_data['username'],
            password      = validated_data['password'],
            es_infantil   = True,
            first_name    = first_name,
            last_name     = last_name
        )
        # 2) Vinculamos al padre
        parent_user = self.context['request'].user
        user.parent = parent_user
        user.save()

        # 3) Creamos el PerfilInfantil asociado
        PerfilInfantil.objects.create(
            usuario_padre = parent_user,
            user_infantil = user,
            nombre = f"{first_name} {last_name}",
            edad = edad
        )

        return user

class ConfiguracionParentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracionParental
        fields = ['idioma', 'limite_tiempo', 'accesibilidad']