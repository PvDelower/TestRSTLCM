from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import SimpleRouter

from vuner_products.views import VulnerabilitiesCsvViewSet, VulnerabilitiesViewSet

router = SimpleRouter()

router.register("api/vulnerabilities", VulnerabilitiesViewSet)
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.authtoken")),
    path("api/csv/", VulnerabilitiesCsvViewSet.as_view({"get": "list"})),
]
urlpatterns += router.urls
