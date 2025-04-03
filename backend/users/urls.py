from django.urls import path
from .views import RegistroUsuarioView
from .views import CrearPerfilInfantilView

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro'),
    path('crear-perfil-infantil/', CrearPerfilInfantilView.as_view(), name='crear-perfil-infantil'),
]
