from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from users.models import PerfilInfantil
from .models import ComponenteAvatar, Avatar
from .serializers import ComponenteAvatarSerializer, AvatarSerializer
from .utils import get_available_components

class AvatarViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='mi-avatar/(?P<perfil_id>[^/.]+)')
    def obtener_avatar(self, request, perfil_id):
        try:
            avatar = Avatar.objects.get(perfil_id=perfil_id)
            serializer = AvatarSerializer(avatar, context={'request': request})
            return Response(serializer.data)
        except Avatar.DoesNotExist:
            return Response({'error': 'Avatar no encontrado'}, status=404)

    @action(detail=False, methods=['post'], url_path='actualizar/(?P<perfil_id>[^/.]+)')
    def actualizar_avatar(self, request, perfil_id):
        avatar = Avatar.objects.get(perfil_id=perfil_id)
        data = request.data
        avatar.pelo_id = data.get('pelo')
        avatar.ojos_id = data.get('ojos')
        avatar.ropa_id = data.get('ropa')
        avatar.accesorio_id = data.get('accesorio')
        avatar.save()
        return Response({'status': 'avatar actualizado'})

    @action(detail=False, methods=['get'], url_path='componentes/(?P<tipo>[^/.]+)/(?P<perfil_id>[^/.]+)')
    def componentes_disponibles(self, request, tipo, perfil_id):
        componentes = get_available_components(tipo, perfil_id)
        serializer = ComponenteAvatarSerializer(componentes, many=True, context={'request': request})
        return Response(serializer.data)
