from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import PerfilInfantilSerializer
from .models import PerfilInfantil

# Create your views here.
class RegistroUsuarioView(APIView):
    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"mensaje": "Usuario creado correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CrearPerfilInfantilView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.es_padre:
            return Response({"error": "Solo los usuarios con rol padre pueden crear perfiles infantiles."},
                            status=status.HTTP_403_FORBIDDEN)
        
        serializer = PerfilInfantilSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(usuario_padre=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)