from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import PerfilInfantilSerializer, RegistroSerializer, ConfiguracionParentalSerializer
from .models import PerfilInfantil, ConfiguracionParental
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken  # Para generar los tokens

# Create your views here.

class RegistroUsuarioView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden crear un usuario

    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"mensaje": "Usuario creado correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CrearPerfilInfantilView(APIView):
    permission_classes = [IsAuthenticated]  # Esta vista requiere que el usuario esté autenticado

    def post(self, request):
        # Verificamos que el usuario sea un 'padre'
        if not request.user.es_padre:
            return Response({"error": "Solo los usuarios con rol padre pueden crear perfiles infantiles."},
                            status=status.HTTP_403_FORBIDDEN)
        
        serializer = PerfilInfantilSerializer(data=request.data)
        if serializer.is_valid():
            # Asignamos al perfil creado el usuario padre autenticado
            serializer.save(usuario_padre=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = []  # No se necesita autenticación para este endpoint

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Autenticar al usuario
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                # Crear el token de acceso y refresh token
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                    'username': user.username
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User is inactive."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        
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
            "id": getattr(user, "id", None),
            "username": getattr(user, "username", ""),
            "email": getattr(user, "email", ""),
            "es_padre": getattr(user, "es_padre", False),
            "es_infantil": getattr(user, "es_infantil", False),
        })