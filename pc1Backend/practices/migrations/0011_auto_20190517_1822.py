# Generated by Django 2.1 on 2019-05-18 01:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('practices', '0010_auto_20190517_1727'),
    ]

    operations = [
        migrations.AlterField(
            model_name='practice',
            name='entity',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='practices', to='practices.Entity'),
        ),
    ]
