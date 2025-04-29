from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

def render_avatar(avatar) -> Image.Image:
    """
    Renderiza un avatar completo combinando todos sus componentes.
    Retorna una imagen PIL con el avatar completo.
    """
    # Crear una imagen base transparente
    base_image = Image.new('RGBA', (500, 500), (0, 0, 0, 0))
    
    # Orden de renderizado (de atrás hacia adelante)
    components = [
        ('ropa', avatar.ropa),
        ('pelo', avatar.pelo),
        ('ojos', avatar.ojos),
        ('accesorio', avatar.accesorio)
    ]
    
    for component_type, component in components:
        if component and component.imagen:
            try:
                # Abrir la imagen del componente
                component_image = Image.open(component.imagen)
                
                # Asegurarse de que la imagen tenga canal alpha
                if component_image.mode != 'RGBA':
                    component_image = component_image.convert('RGBA')
                
                # Redimensionar el componente si es necesario
                if component_image.size != base_image.size:
                    component_image = component_image.resize(base_image.size, Image.Resampling.LANCZOS)
                
                # Combinar con la imagen base
                base_image = Image.alpha_composite(base_image, component_image)
                
            except Exception as e:
                print(f"Error al procesar el componente {component_type}: {str(e)}")
                continue
    
    return base_image

def save_avatar_preview(avatar) -> ContentFile:
    """
    Genera y guarda una vista previa del avatar completo.
    Retorna un ContentFile con la imagen del avatar completo.
    """
    # Renderizar el avatar
    avatar_image = render_avatar(avatar)
    
    # Convertir la imagen a bytes
    image_io = BytesIO()
    avatar_image.save(image_io, format='PNG')
    image_io.seek(0)
    
    # Crear un ContentFile con la imagen
    return ContentFile(image_io.getvalue(), name=f'avatar_{avatar.perfil.id}.png')

def get_available_components(tipo: str, perfil_id: int) -> list:
    """
    Obtiene los componentes disponibles para un perfil específico.
    Incluye componentes desbloqueados por defecto y aquellos desbloqueados por recompensas.
    """
    from .models import ComponenteAvatar, RecompensaPerfil
    
    # Obtener componentes desbloqueados por defecto
    default_components = ComponenteAvatar.objects.filter(
        tipo=tipo,
        desbloqueado=True
    )
    
    # Obtener componentes desbloqueados por recompensas
    reward_components = ComponenteAvatar.objects.filter(
        tipo=tipo,
        recompensas_desbloqueo__perfiles__id=perfil_id
    )
    
    # Combinar y eliminar duplicados
    return list(set(list(default_components) + list(reward_components))) 