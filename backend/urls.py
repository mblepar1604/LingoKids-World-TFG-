from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse, HttpResponseNotAllowed, FileResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
import pathlib

# Vista para la raíz
def root_view(request):
    if request.method in ["GET", "HEAD"]:
        return JsonResponse({"mensaje": "Bienvenido a la API de LingoKids-World-TFG"})
    return HttpResponseNotAllowed(["GET", "HEAD"])

def favicon(request):
    p = pathlib.Path(__file__).resolve().parent.parent / 'static' / 'favicon.ico'
    return FileResponse(open(p, 'rb'), content_type='image/x-icon')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/cuentos/', include('cuentos.urls')),
    path('api/juegos/', include('juegos.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('favicon.ico', favicon),
    re_path(r'^/?$', root_view),  # Coincide con '/' y con '' (sin o con barra final)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)