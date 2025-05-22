from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    PerfilInfantilSerializer, RegistroSerializer,
    ConfiguracionParentalSerializer, ChildSerializer
)
from .models import ConfiguracionParental

class RegistroUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

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
        from rest_framework_simplejwt.tokens import RefreshToken

        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
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