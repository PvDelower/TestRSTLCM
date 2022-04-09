import sqlite3

import pandas as pd
from django.http import FileResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ViewSet

from vuner_products.models import Vulnerabilities
from vuner_products.permissions import IsOwnerOrReadOnlyOrAdmin
from vuner_products.serializers import VulnerabilitiesSerializer


class VulnerabilitiesViewSet(ModelViewSet):
    queryset = Vulnerabilities.objects.all()
    serializer_class = VulnerabilitiesSerializer
    permission_classes = [IsOwnerOrReadOnlyOrAdmin]

    def perform_create(self, serializer):
        serializer.save()


class VulnerabilitiesCsvViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):

        con = sqlite3.connect("db.sqlite3")
        df = pd.read_sql("SELECT * FROM vuner_products_vulnerabilities", con)
        df.to_csv("output.csv", index=False, encoding="utf-8")
        return FileResponse(open("output.csv", "rb"))
