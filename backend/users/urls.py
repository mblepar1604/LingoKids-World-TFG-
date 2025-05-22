from django.urls import path
from .views import (
    RegistroUsuarioView,
    CrearPerfilInfantilView,
    ConfiguracionParentalView,
    UsuarioActualView,
    ChildrenAPIView
)

app_name = 'users'

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro'),
    path('crear-perfil-infantil/', CrearPerfilInfantilView.as_view(), name='crear-perfil-infantil'),
    path('configuracion-parental/', ConfiguracionParentalView.as_view(), name='configuracion-parental'),
    path('me/', UsuarioActualView.as_view(), name='usuario-actual'),
    path('children/', ChildrenAPIView.as_view(), name='children-api'),
]