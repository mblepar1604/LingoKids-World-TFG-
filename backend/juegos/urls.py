from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.JuegoViewSet, basename='juego')
router.register(r'tipos', views.TipoJuegoViewSet, basename='tipo-juego')
router.register(r'progresos', views.ProgresoJuegoViewSet, basename='progreso-juego')
router.register(r'estadisticas', views.EstadisticaJuegoViewSet, basename='estadistica-juego')

urlpatterns = [
    path('', include(router.urls)),
]