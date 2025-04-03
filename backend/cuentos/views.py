from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Cuento
from .serializers import CuentoSerializer

# Create your views here.
class CuentoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CuentoSerializer

    def get_queryset(self):
        idioma = self.request.query_params.get('idioma')
        if idioma:
            return Cuento.objects.filter(idioma__iexact=idioma)
        return Cuento.objects.all()