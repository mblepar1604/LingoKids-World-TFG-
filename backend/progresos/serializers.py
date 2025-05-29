from rest_framework import serializers
from .models import Progreso

class ProgresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progreso
        fields = '__all__'
