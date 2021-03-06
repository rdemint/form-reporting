# Generated by Django 2.1 on 2019-05-01 02:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('user_type', models.CharField(choices=[('doctor', 'Doctor'), ('staff', 'Staff'), ('admin', 'Admin')], max_length=100)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DailySummary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(null=True)),
                ('last_updated', models.DateTimeField(auto_now_add=True)),
                ('visits', models.IntegerField()),
                ('workdays', models.IntegerField()),
                ('noshows', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Entity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('slug', models.SlugField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Practice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('slug', models.SlugField(unique=True)),
                ('entity', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='practices', to='practices.Entity')),
            ],
        ),
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=256)),
                ('last_name', models.CharField(max_length=256)),
                ('credentials', models.CharField(max_length=256)),
                ('alias_1', models.CharField(max_length=256)),
                ('alias_2', models.CharField(max_length=256)),
                ('entity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='providers', to='practices.Entity')),
                ('practices', models.ManyToManyField(related_name='providers', to='practices.Practice')),
            ],
        ),
        migrations.AddField(
            model_name='dailysummary',
            name='entity',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='daily_summaries', to='practices.Entity'),
        ),
        migrations.AddField(
            model_name='dailysummary',
            name='practice',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='daily_summaries', to='practices.Practice'),
        ),
        migrations.AddField(
            model_name='dailysummary',
            name='provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='daily_summaries', to='practices.Provider'),
        ),
        migrations.AddField(
            model_name='user',
            name='entity',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='entities', to='practices.Entity'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='practice',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='practices.Practice'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.AlterUniqueTogether(
            name='dailysummary',
            unique_together={('practice', 'date')},
        ),
    ]
