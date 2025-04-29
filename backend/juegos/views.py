from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Avg, Count
from .models import TipoJuego, Juego, ProgresoJuego, EstadisticaJuego
from .serializers import (
    TipoJuegoSerializer, 
    JuegoSerializer, 
    ProgresoJuegoSerializer,
    EstadisticaJuegoSerializer
)

class TipoJuegoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver los tipos de juegos disponibles.
    """
    queryset = TipoJuego.objects.all()
    serializer_class = TipoJuegoSerializer
    permission_classes = [IsAuthenticated]

class JuegoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver los juegos disponibles con filtrado por tipo y nivel de dificultad.
    """
    queryset = Juego.objects.all()
    serializer_class = JuegoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filtra los juegos según los parámetros de consulta.
        - tipo: ID del tipo de juego
        - nivel: Nivel de dificultad (1: Fácil, 2: Medio, 3: Difícil)
        - idioma: Idioma del juego
        - edad: Edad del usuario para filtrar por edad_minima y edad_maxima
        """
        queryset = Juego.objects.filter(activo=True)
        
        # Filtro por tipo de juego
        tipo_id = self.request.query_params.get('tipo', None)
        if tipo_id:
            queryset = queryset.filter(tipo_id=tipo_id)
        
        # Filtro por nivel de dificultad
        nivel = self.request.query_params.get('nivel', None)
        if nivel:
            queryset = queryset.filter(tipo__nivel_dificultad=nivel)
        
        # Filtro por idioma
        idioma = self.request.query_params.get('idioma', None)
        if idioma:
            queryset = queryset.filter(idioma__iexact=idioma)
        
        # Filtro por edad del usuario
        edad = self.request.query_params.get('edad', None)
        if edad:
            try:
                edad = int(edad)
                queryset = queryset.filter(
                    tipo__edad_minima__lte=edad,
                    tipo__edad_maxima__gte=edad
                )
            except ValueError:
                pass
        
        return queryset

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def recomendados(self, request):
        """
        Endpoint que devuelve juegos recomendados según el perfil del usuario.
        """
        # Obtener el perfil infantil del usuario si existe
        perfil_id = request.query_params.get('perfil_id', None)
        if not perfil_id:
            return Response(
                {"error": "Se requiere el ID del perfil infantil"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Obtener el perfil infantil
            perfil = PerfilInfantil.objects.get(id=perfil_id)
            
            # Verificar que el perfil pertenece al usuario autenticado
            if perfil.usuario_padre != request.user and not request.user.es_infantil:
                return Response(
                    {"error": "No tienes permiso para acceder a este perfil"},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Obtener juegos recomendados según la edad del perfil
            juegos_recomendados = Juego.objects.filter(
                activo=True,
                tipo__edad_minima__lte=perfil.edad,
                tipo__edad_maxima__gte=perfil.edad
            )
            
            # Si hay progresos, priorizar juegos no completados
            progresos = ProgresoJuego.objects.filter(perfil_infantil=perfil)
            if progresos.exists():
                juegos_completados = progresos.filter(completado=True).values_list('juego_id', flat=True)
                juegos_recomendados = juegos_recomendados.exclude(id__in=juegos_completados)
            
            # Limitar a 5 juegos recomendados
            juegos_recomendados = juegos_recomendados[:5]
            
            serializer = self.get_serializer(juegos_recomendados, many=True)
            return Response(serializer.data)
            
        except PerfilInfantil.DoesNotExist:
            return Response(
                {"error": "Perfil infantil no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['get'])
    def estadisticas(self, request, pk=None):
        juego = self.get_object()
        estadistica, created = EstadisticaJuego.objects.get_or_create(juego=juego)
        
        # Calcular estadísticas en tiempo real
        progresos = ProgresoJuego.objects.filter(juego=juego)
        total_jugadores = progresos.count()
        
        if total_jugadores > 0:
            promedio_puntuacion = progresos.aggregate(Avg('puntuacion'))['puntuacion__avg']
            tiempo_promedio = progresos.aggregate(Avg('tiempo_jugado'))['tiempo_jugado__avg']
        else:
            promedio_puntuacion = 0
            tiempo_promedio = 0
        
        # Actualizar estadísticas
        estadistica.total_jugadores = total_jugadores
        estadistica.promedio_puntuacion = promedio_puntuacion
        estadistica.tiempo_promedio = tiempo_promedio
        estadistica.save()
        
        serializer = EstadisticaJuegoSerializer(estadistica)
        return Response(serializer.data)

class ProgresoJuegoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite gestionar el progreso de los juegos.
    """
    queryset = ProgresoJuego.objects.all()
    serializer_class = ProgresoJuegoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filtra los progresos según el perfil infantil.
        """
        perfil_id = self.request.query_params.get('perfil_id', None)
        if perfil_id:
            return ProgresoJuego.objects.filter(perfil_infantil_id=perfil_id)
        return ProgresoJuego.objects.filter(perfil_infantil=self.request.user)

    def perform_create(self, serializer):
        """
        Asigna el perfil infantil al crear un nuevo progreso.
        """
        perfil_id = self.request.data.get('perfil_infantil')
        if not perfil_id:
            raise serializers.ValidationError({"perfil_infantil": "Este campo es requerido"})
        
        try:
            perfil = PerfilInfantil.objects.get(id=perfil_id)
            # Verificar que el perfil pertenece al usuario autenticado
            if perfil.usuario_padre != self.request.user and not self.request.user.es_infantil:
                raise serializers.ValidationError({"perfil_infantil": "No tienes permiso para acceder a este perfil"})
            
            serializer.save(perfil_infantil=perfil)
        except PerfilInfantil.DoesNotExist:
            raise serializers.ValidationError({"perfil_infantil": "Perfil infantil no encontrado"})

class EstadisticaJuegoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EstadisticaJuego.objects.all()
    serializer_class = EstadisticaJuegoSerializer
    permission_classes = [IsAuthenticated]
