from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Logro, PerfilLogro
from .serializers import LogroSerializer, PerfilLogroSerializer

class LogroViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Listado de TODOS los logros disponibles (activos=True).
    El usuario no necesita estar autenticado para ver la lista de logros disponibles,
    pero vamos a forzar que esté autenticado por si luego filtramos por rol.
    """
    queryset = Logro.objects.filter(activo=True).order_by('id')
    serializer_class = LogroSerializer
    permission_classes = [permissions.IsAuthenticated]

class PerfilLogroViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Listado de logros YA desbloqueados para un cierto perfil infantil.
    - Si el usuario es padre: puede listar los logros de cualquiera de sus hijos.
    - Si el usuario es niño: solo puede listar sus propios logros.
    - No permitimos crear ni actualizar desde aquí; las entradas se generan
      automáticamente vía señales cuando se cumplen los criterios.
    """
    serializer_class = PerfilLogroSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        perfil_id = self.request.query_params.get('perfil_infantil')

        if perfil_id is None:
            return PerfilLogro.objects.none()

        # Intentamos recuperar el perfil solicitado
        from users.models import PerfilInfantil
        try:
            perfil_obj = PerfilInfantil.objects.get(id=perfil_id)
        except PerfilInfantil.DoesNotExist:
            return PerfilLogro.objects.none()

        # Verificamos permisos:
        # 1) Si user.es_padre, el perfil_infantil.usuario_padre debe coincidir con user.
        if user.es_padre:
            if perfil_obj.usuario_padre_id != user.id:
                return PerfilLogro.objects.none()
            return PerfilLogro.objects.filter(perfil_infantil=perfil_obj)

        # 2) Si user.es_infantil, solo puede acceder a su propio perfil
        if user.es_infantil:
            if perfil_obj.id != getattr(user, 'perfil_infantil', None).id:
                return PerfilLogro.objects.none()
            return PerfilLogro.objects.filter(perfil_infantil=perfil_obj)

        return PerfilLogro.objects.none()