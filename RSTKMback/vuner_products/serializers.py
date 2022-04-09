from rest_framework.serializers import ModelSerializer

from vuner_products.models import Vulnerabilities


class VulnerabilitiesSerializer(ModelSerializer):
    class Meta:
        model = Vulnerabilities
        fields = "__all__"
