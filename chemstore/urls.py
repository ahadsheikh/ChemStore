from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenVerifyView
)

from account.views import CustomTokenObtainPairView

urlpatterns = []
if settings.DEBUG:
    urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('admin/', admin.site.urls),

    # JWT Auth
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/varify/', TokenVerifyView.as_view(), name='token_varify'),
    path('api/account/', include('account.urls')),
    path('api/management/', include('administration.urls')),
    path('api/storeobjects/', include('storeobjects.urls')),
    path('api/filemanager/', include('filemanager.urls')),

    # re_path(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    # re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html'), name='index'),
]
