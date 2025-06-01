from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse, HttpResponseNotAllowed
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

def root_view(request):
    if request.method in ["GET", "HEAD"]:
        return JsonResponse({"mensaje": "Bienvenido a la API de LingoKids-World-TFG"})
    return HttpResponseNotAllowed(["GET", "HEAD"])

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/cuentos/', include('cuentos.urls')),
    path('api/juegos/', include('juegos.urls')),
    path('api/avatar/', include('avatar.urls')),
    path('api/progreso/', include('progreso.urls')),
    path('api/logros/', include('logros.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r'^$', root_view),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)