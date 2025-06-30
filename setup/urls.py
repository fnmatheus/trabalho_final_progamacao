from django.contrib import admin
from django.urls import path

from simulator.views import home, simulate

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home),
    path("simulate/", simulate),
]
