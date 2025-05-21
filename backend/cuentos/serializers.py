from rest_framework import serializers
from .models import Cuento

class CuentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuento
        fields = '__all__'
