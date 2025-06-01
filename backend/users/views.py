from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    PerfilInfantilSerializer,
    RegistroSerializer,
    ConfiguracionParentalSerializer,
    ChildSerializer
)
from .models import ConfiguracionParental, User, PerfilInfantil

class RegistroUsuarioView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Usuario creado correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CrearPerfilInfantilView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.es_padre:
            return Response({"error": "Solo padres pueden crear perfiles infantiles."}, status=status.HTTP_403_FORBIDDEN)
        serializer = PerfilInfantilSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(usuario_padre=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        from django.contrib.auth import authenticate

        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user and user.is_active:
            from rest_framework_simplejwt.tokens import AccessToken
            from datetime import timedelta

            tiempo_token = timedelta(minutes=60)
            if user.es_infantil:
                try:
                    if user.parent:
                        config = ConfiguracionParental.objects.get(usuario=user.parent)
                        minutos = config.limite_tiempo or 30
                        tiempo_token = timedelta(minutes=minutos)
                    else:
                        tiempo_token = timedelta(minutes=30)
                except ConfiguracionParental.DoesNotExist:
                    tiempo_token = timedelta(minutes=30)

            access = AccessToken.for_user(user)
            access.set_exp(from_time=None, lifetime=tiempo_token)

            return Response({
                'access_token': str(access),
                'username': user.username,
                'es_padre': user.es_padre,
                'es_infantil': user.es_infantil
            })

        return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

class ConfiguracionParentalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        config, _ = ConfiguracionParental.objects.get_or_create(usuario=request.user)
        serializer = ConfiguracionParentalSerializer(config)
        return Response(serializer.data)

    def post(self, request):
        config, _ = ConfiguracionParental.objects.get_or_create(usuario=request.user)
        serializer = ConfiguracionParentalSerializer(config, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import PerfilInfantil

class UsuarioActualView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "es_padre": user.es_padre,
            "es_infantil": user.es_infantil,
        }

        if user.es_infantil:
            perfil = PerfilInfantil.objects.get(user_infantil=user)
            data["perfilInfantilId"] = perfil.id

        return Response(data)
class ChildrenAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.es_padre:
            return Response({'detail': 'Forbidden'}, status=403)

        # Obtenemos todos los usuarios infantiles cuyo 'parent' es el usuario actual
        hijos_qs = request.user.children.all()
        resultado = []

        for hijo in hijos_qs:
            # Buscamos el PerfilInfantil cuyos user_infantil sea este hijo
            try:
                perfil = PerfilInfantil.objects.get(user_infantil=hijo)
                perfil_id = perfil.id
            except PerfilInfantil.DoesNotExist:
                # Si no existiera perfil (aunque debería existir), ponemos None o 0
                perfil_id = None

            resultado.append({
                'id': hijo.id,
                'username': hijo.username,
                'perfil_id': perfil_id
            })

        return Response(resultado)

    def post(self, request):
        if not request.user.es_padre:
            return Response({'detail': 'Forbidden'}, status=403)

        serializer = ChildSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            child_user = serializer.save()

            # Buscamos el PerfilInfantil que acabamos de crear
            perfil_obj = PerfilInfantil.objects.get(
                usuario_padre=request.user,
                nombre=f"{child_user.first_name} {child_user.last_name}"
            )
            data = {
                'user_id': child_user.id,
                'username': child_user.username,
                'perfil_id': perfil_obj.id
            }
            return Response(data, status=201)

        return Response(serializer.errors, status=400)

    def delete(self, request, pk=None):
        if not request.user.es_padre:
            return Response({'detail': 'No autorizado'}, status=403)
        try:
            child = request.user.children.get(pk=pk)
            # Antes de borrar el User, borramos su perfil infantil
            PerfilInfantil.objects.filter(
                usuario_padre=request.user,
                nombre=f"{child.first_name} {child.last_name}"
            ).delete()
            child.delete()
            return Response({'detail': 'Eliminado correctamente'}, status=204)
        except User.DoesNotExist:
            return Response({'detail': 'Hijo no encontrado'}, status=404)

class CambiarContrasenaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        actual = request.data.get("actual")
        nueva = request.data.get("nueva")

        if not user.check_password(actual):
            return Response({"detail": "La contraseña actual no es correcta"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(nueva)
        user.save()
        return Response({"detail": "Contraseña actualizada correctamente"}, status=status.HTTP_200_OK)