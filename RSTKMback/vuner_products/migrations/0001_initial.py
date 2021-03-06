# Generated by Django 4.0.3 on 2022-04-08 20:47

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Vulnerabilities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('product', models.CharField(max_length=30)),
                ('detection_date', models.DateTimeField()),
                ('description', models.CharField(blank=True, max_length=300)),
                ('has_exploit', models.BooleanField()),
                ('owner', models.ForeignKey(default=django.contrib.auth.models.User, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
