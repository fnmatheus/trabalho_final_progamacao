from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from simulator.views import home, simulate

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home),
    path("simulate/", simulate),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
