from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Progreso
from .serializers import ProgresoSerializer

class ProgresoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            progreso = Progreso.objects.get(usuario=request.user)
            serializer = ProgresoSerializer(progreso)
            return Response(serializer.data)
        except Progreso.DoesNotExist:
            return Response({"error": "Progreso no encontrado"}, status=404)

    def post(self, request):
        try:
            progreso = Progreso.objects.get(usuario=request.user)
            serializer = ProgresoSerializer(progreso, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Progreso.DoesNotExist:
            return Response({"error": "Progreso no encontrado"}, status=404)
