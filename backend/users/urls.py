from django.urls import path
from .views import (
    RegistroUsuarioView,
    CrearPerfilInfantilView,
    ConfiguracionParentalView,
    UsuarioActualView,
    ChildrenAPIView,
    CambiarContrasenaView,
    LoginView,
)

app_name = 'users'

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro'),
    path('login/', LoginView.as_view(), name='login'),
    path('crear-perfil-infantil/', CrearPerfilInfantilView.as_view(), name='crear-perfil-infantil'),
    path('configuracion-parental/', ConfiguracionParentalView.as_view(), name='configuracion-parental'),
    path('me/', UsuarioActualView.as_view(), name='usuario-actual'),
    path('children/', ChildrenAPIView.as_view(), name='children-api'),
    path('cambiar-password/', CambiarContrasenaView.as_view(), name='cambiar-password'),
    path('children/<int:pk>/', ChildrenAPIView.as_view(), name='children-delete'),
]