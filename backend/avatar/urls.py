from django.urls import path
from .views import AvatarViewSet

avatar_list = AvatarViewSet.as_view({
    'get': 'list',
})

urlpatterns = [
    path('mi-avatar/<int:perfil_id>/', AvatarViewSet.as_view({'get': 'obtener_avatar'})),
    path('actualizar/<int:perfil_id>/', AvatarViewSet.as_view({'post': 'actualizar_avatar'})),
    path('componentes/<str:tipo>/<int:perfil_id>/', AvatarViewSet.as_view({'get': 'componentes_disponibles'})),
]
