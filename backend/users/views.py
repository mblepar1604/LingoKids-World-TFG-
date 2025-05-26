from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import AccessToken
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    PerfilInfantilSerializer, 
    RegistroSerializer,
    ConfiguracionParentalSerializer, 
    ChildSerializer
)
from .models import ConfiguracionParental, User

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
    permission_classes = []

    def post(self, request):
        from django.contrib.auth import authenticate

        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user and user.is_active:
            # Tiempo por defecto para admin/padre
            tiempo_token = timedelta(minutes=60)

            if user.is_infantil:
                try:
                    config = ConfiguracionParental.objects.get(usuario=user.padre)
                    minutos = config.limite_tiempo or 30  # fallback si es None
                    tiempo_token = timedelta(minutes=minutos)
                except ConfiguracionParental.DoesNotExist:
                    tiempo_token = timedelta(minutes=30)

            # Generar el token manualmente
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

class UsuarioActualView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "es_padre": user.es_padre,
            "es_infantil": user.es_infantil,
        })

class ChildrenAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.es_padre:
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ChildSerializer(request.user.children.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.es_padre:
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ChildSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            child = serializer.save()
            return Response(ChildSerializer(child).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        if not request.user.es_padre:
            return Response({'detail': 'No autorizado'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            child = request.user.children.get(pk=pk)
            child.delete()
            return Response({'detail': 'Eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'detail': 'Hijo no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
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