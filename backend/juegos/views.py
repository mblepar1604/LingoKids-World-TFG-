from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import TipoJuego, Juego
from .serializers import TipoJuegoSerializer, JuegoSerializer

class TipoJuegoViewSet(viewsets.ModelViewSet):
    """
    API endpoint para CRUD de Tipos de Juego.
    """
    queryset = TipoJuego.objects.all()
    serializer_class = TipoJuegoSerializer
    permission_classes = [IsAuthenticated]

class JuegoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver los juegos disponibles con filtrado por tipo, nivel de dificultad, idioma y edad.
    """
    queryset = Juego.objects.all()
    serializer_class = JuegoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filtra los juegos según los parámetros de consulta:
        - tipo: ID del tipo de juego
        - nivel: Nivel de dificultad (1: Fácil, 2: Medio, 3: Difícil)
        - idioma: Idioma del juego (p.ej. 'es', 'en')
        - edad: Edad del usuario para filtrar por edad_minima y edad_maxima
        """
        queryset = Juego.objects.filter(activo=True)
        
        # Filtrar por tipo de juego (id de TipoJuego)
        tipo_id = self.request.query_params.get('tipo', None)
        if tipo_id:
            queryset = queryset.filter(tipo_id=tipo_id)

        # Filtrar por nivel de dificultad (viene de TipoJuego.nivel_dificultad)
        nivel = self.request.query_params.get('nivel', None)
        if nivel:
            queryset = queryset.filter(tipo__nivel_dificultad=nivel)

        # Filtrar por idioma
        idioma = self.request.query_params.get('idioma', None)
        if idioma:
            queryset = queryset.filter(idioma=idioma)

        # Filtrar por edad: edad debe estar en el rango [edad_minima, edad_maxima] del TipoJuego
        edad = self.request.query_params.get('edad', None)
        if edad:
            try:
                edad_int = int(edad)
                queryset = queryset.filter(
                    tipo__edad_minima__lte=edad_int,
                    tipo__edad_maxima__gte=edad_int
                )
            except ValueError:
                # Si "edad" no es un entero válido, no hacemos el filtro
                pass

        return queryset