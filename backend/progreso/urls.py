from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ProgresoGeneralOnTheFlyView,
    ProgresoJuegoViewSet,
    ProgresoCuentoViewSet
)

router = DefaultRouter()
# Registramos solo los endpoints de juegos y cuentos como ViewSets:
router.register(r'juegos', ProgresoJuegoViewSet, basename='progreso-juegos')
router.register(r'cuentos', ProgresoCuentoViewSet, basename='progreso-cuentos')

urlpatterns = [
    path('general/', ProgresoGeneralOnTheFlyView.as_view(), name='progreso-general'),
]

urlpatterns += router.urls