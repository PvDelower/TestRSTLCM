from django.contrib.auth.models import User
from django.db import models


class Vulnerabilities(models.Model):
    name = models.CharField(max_length=30)
    product = models.CharField(max_length=30)
    detection_date = models.DateTimeField()
    description = models.CharField(max_length=300, blank=True)
    has_exploit = models.BooleanField()
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, default=User)
