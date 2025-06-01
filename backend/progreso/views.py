from django.db.models import Sum
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ProgresoJuego, ProgresoCuento
from .serializers import (
    ProgresoJuegoSerializer,
    ProgresoCuentoSerializer
)
from users.models import PerfilInfantil


class ProgresoGeneralOnTheFlyView(APIView):
    """
    Vista para calcular el progreso general (totales) sobre la marcha,
    sin necesidad de una tabla física ProgresoGeneral.  
    Suma:
      - tiempo_juegos = SUM(tiempo_jugado) sobre ProgresoJuego
      - tiempo_cuentos = SUM(tiempo_leido) sobre ProgresoCuento
      - tiempo_total = suma de ambos
    Filtrado:
      - Si el usuario es padre, solo permite ver perfiles de sus hijos.
      - Si el usuario es niño, solo permite ver su propio perfil.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        perfil_id = request.query_params.get('perfil_infantil')
        if not perfil_id:
            return Response(
                {"detail": "El parámetro 'perfil_infantil' es obligatorio."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Intentamos recuperar el perfil infantil
        try:
            perfil = PerfilInfantil.objects.get(id=perfil_id)
        except PerfilInfantil.DoesNotExist:
            return Response(
                {"detail": "Perfil infantil no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )

        user = request.user
        # Si es padre, debe ser el usuario_padre de ese perfil
        if user.es_padre and perfil.usuario_padre_id != user.id:
            return Response(
                {"detail": "No tienes permiso para ver este progreso."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Si es niño, debe coincidir con su propio perfil
        if user.es_infantil and perfil.id != getattr(user, 'perfil_infantil', None).id:
            return Response(
                {"detail": "No tienes permiso para ver este progreso."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Sumar todos los tiempos de ProgresoJuego para este perfil
        resumen_juegos = ProgresoJuego.objects.filter(
            perfil_infantil=perfil
        ).aggregate(total_j=Sum('tiempo_jugado'))
        tiempo_juegos = resumen_juegos.get('total_j') or 0

        # Sumar todos los tiempos de ProgresoCuento para este perfil
        resumen_cuentos = ProgresoCuento.objects.filter(
            perfil_infantil=perfil
        ).aggregate(total_c=Sum('tiempo_leido'))
        tiempo_cuentos = resumen_cuentos.get('total_c') or 0

        tiempo_total = tiempo_juegos + tiempo_cuentos

        datos = {
            "perfil_infantil": perfil.id,
            "tiempo_juegos": tiempo_juegos,
            "tiempo_cuentos": tiempo_cuentos,
            "tiempo_total": tiempo_total
        }
        return Response(datos, status=status.HTTP_200_OK)


class ProgresoJuegoViewSet(viewsets.ModelViewSet):
    """
    CRUD para ProgresoJuego.  
    - Listado (GET):
        - Si user.es_padre: retorna todos los ProgresoJuego de sus hijos.
        - Si user.es_infantil: retorna únicamente sus propios ProgresoJuego.
    - Creación/Actualización (POST/PUT):
        - Si un registro ya existe (pari perfil_infantil+juego), lo acumula.
        - Si no existe, crea uno nuevo.
    """
    serializer_class = ProgresoJuegoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.es_padre:
            return ProgresoJuego.objects.filter(
                perfil_infantil__usuario_padre=user
            )

        if user.es_infantil:
            try:
                perfil = user.perfil_infantil
            except PerfilInfantil.DoesNotExist:
                return ProgresoJuego.objects.none()
            return ProgresoJuego.objects.filter(perfil_infantil=perfil)

        return ProgresoJuego.objects.none()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        perfil_id = data.get('perfil_infantil')
        juego_id = data.get('juego')
        tiempo_nuevo = data.get('tiempo_jugado', 0)
        stats_nuevas = data.get('estadisticas', {})

        if perfil_id is None or juego_id is None:
            return Response(
                {"detail": "Los campos 'perfil_infantil' y 'juego' son obligatorios."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            progreso = ProgresoJuego.objects.get(
                perfil_infantil_id=perfil_id,
                juego_id=juego_id
            )
        except ProgresoJuego.DoesNotExist:
            # No existe → delegamos a creación normal
            respuesta = super().create(request, *args, **kwargs)
            return respuesta

        # Si existe, sumamos tiempo y mezclamos estadísticas
        try:
            tiempo_nuevo_int = int(tiempo_nuevo)
        except (ValueError, TypeError):
            tiempo_nuevo_int = 0

        progreso.tiempo_jugado += tiempo_nuevo_int

        estad_previas = progreso.estadisticas or {}
        estad_nuevas = stats_nuevas or {}
        mezcla = {}

        # Copiamos estadísticas previas
        for k, v in estad_previas.items():
            mezcla[k] = v

        # Mezclamos con estadísticas nuevas
        for k, valor_nuevo in estad_nuevas.items():
            if (
                k in mezcla 
                and isinstance(mezcla[k], (int, float)) 
                and isinstance(valor_nuevo, (int, float))
            ):
                llave = k.lower()
                if 'max' in llave or 'best' in llave or 'highest' in llave:
                    mezcla[k] = max(mezcla[k], valor_nuevo)
                else:
                    mezcla[k] = mezcla[k] + valor_nuevo
            else:
                mezcla[k] = valor_nuevo

        progreso.estadisticas = mezcla
        progreso.save()

        serializer = self.get_serializer(progreso)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save()


class ProgresoCuentoViewSet(viewsets.ModelViewSet):
    """
    CRUD para ProgresoCuento.
    - Listado (GET):
        - Si user.es_padre: retorna todos los ProgresoCuento de sus hijos.
        - Si user.es_infantil: retorna únicamente sus propios ProgresoCuento.
    - Creación/Actualización (POST/PUT):
        - Si un registro ya existe (por perfil_infantil+cuento), se puede actualizar campos
          (por ejemplo, tiempo_leido, pag_actual, completado).
        - Si no existe, se crea uno nuevo.
    """
    serializer_class = ProgresoCuentoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.es_padre:
            return ProgresoCuento.objects.filter(
                perfil_infantil__usuario_padre=user
            )

        if user.es_infantil:
            try:
                perfil = user.perfil_infantil
            except PerfilInfantil.DoesNotExist:
                return ProgresoCuento.objects.none()
            return ProgresoCuento.objects.filter(perfil_infantil=perfil)

        return ProgresoCuento.objects.none()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        perfil_id = data.get('perfil_infantil')
        cuento_id = data.get('cuento')
        tiempo_leido_nuevo = data.get('tiempo_leido', 0)
        pag_actual = data.get('pag_actual', 0)
        completado = data.get('completado', False)

        if perfil_id is None or cuento_id is None:
            return Response(
                {"detail": "Los campos 'perfil_infantil' y 'cuento' son obligatorios."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            progreso = ProgresoCuento.objects.get(
                perfil_infantil_id=perfil_id,
                cuento_id=cuento_id
            )
        except ProgresoCuento.DoesNotExist:
            # No existía → delegamos a creación normal
            respuesta = super().create(request, *args, **kwargs)
            return respuesta

        # Si existe, actualizamos acumulando tiempo y ajustando pag_actual/completado
        try:
            tiempo_leido_int = int(tiempo_leido_nuevo)
        except (ValueError, TypeError):
            tiempo_leido_int = 0

        progreso.tiempo_leido += tiempo_leido_int
        progreso.pag_actual = pag_actual
        progreso.completado = bool(completado)
        progreso.save()

        serializer = self.get_serializer(progreso)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save()