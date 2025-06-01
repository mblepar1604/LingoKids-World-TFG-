from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LogroViewSet, PerfilLogroViewSet

router = DefaultRouter()
router.register(r'', LogroViewSet, basename='logro')

perfil_list = PerfilLogroViewSet.as_view({'get': 'list'})

urlpatterns = [
    path('perfil/', perfil_list, name='perfil-logro-list'),
    path('', include(router.urls)),
]