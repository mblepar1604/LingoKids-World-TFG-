from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Cuento
from .serializers import CuentoSerializer

class CuentoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cuento.objects.all()
    serializer_class = CuentoSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['idioma', 'categoria', 'personalizable']  # 🎯 filtros exactos
    search_fields = ['titulo']  # 🔍 búsqueda parcial por título

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
