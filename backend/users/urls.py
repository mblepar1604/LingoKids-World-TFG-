from django.urls import path
from .views import RegistroUsuarioView, ConfiguracionParentalView, CrearPerfilInfantilView, UsuarioActualView

app_name = 'users'

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro'),
    path('crear-perfil-infantil/', CrearPerfilInfantilView.as_view(), name='crear-perfil-infantil'),
    path("configuracion-parental/", ConfiguracionParentalView.as_view(), name="configuracion-parental"),
    path("me/", UsuarioActualView.as_view(), name="usuario-actual"),
]
