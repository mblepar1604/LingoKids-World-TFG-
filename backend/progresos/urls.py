from django.urls import path
from .views import ProgresoView

urlpatterns = [
    path('', ProgresoView.as_view(), name='progreso'),
]
