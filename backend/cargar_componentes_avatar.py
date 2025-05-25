import os
import django
from django.core.files import File

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from avatar.models import ComponenteAvatar

BASE_DIR = os.path.join('media', 'avatar', 'componentes')

tipos = {
    'pelo': 'pelo',
    'ojos': 'ojos',
    'ropa': 'ropa',
    'accesorios': 'accesorio'
}

for carpeta, tipo in tipos.items():
    carpeta_path = os.path.join(BASE_DIR, carpeta)

    if not os.path.exists(carpeta_path):
        print(f"❌ No existe la carpeta: {carpeta_path}")
        continue

    for filename in os.listdir(carpeta_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            ruta_completa = os.path.join(carpeta_path, filename)

            if ComponenteAvatar.objects.filter(nombre=filename, tipo=tipo).exists():
                print(f"🔁 Ya existe: {filename} ({tipo})")
                continue

            with open(ruta_completa, 'rb') as f:
                componente = ComponenteAvatar(
                    nombre=filename,
                    tipo=tipo,
                    desbloqueado=True
                )
                componente.imagen.save(filename, File(f), save=True)
                print(f"✅ Cargado: {filename} como {tipo}")
