# Generated by Django 3.2.8 on 2022-01-26 07:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chemical',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CAS_RN', models.CharField(max_length=10, unique=True)),
                ('name', models.CharField(max_length=300)),
                ('molecular_formula', models.CharField(max_length=300)),
                ('molecular_weight', models.FloatField(blank=True)),
                ('purity', models.CharField(blank=True, max_length=30)),
                ('manufacturer', models.CharField(max_length=50)),
                ('supplier', models.CharField(max_length=50)),
                ('state', models.CharField(choices=[('SOLID', 'Solid'), ('LIQUID', 'Liquid'), ('GAS', 'Gas')], max_length=6)),
                ('amount', models.FloatField(blank=True, default=0.0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Glassware',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('manufacturer', models.CharField(max_length=50)),
                ('supplier', models.CharField(max_length=50)),
                ('size', models.CharField(blank=True, max_length=50)),
                ('material_type', models.CharField(blank=True, default='Unknown', max_length=50)),
                ('quantity', models.PositiveIntegerField(blank=True, default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Instrument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('manufacturer', models.CharField(max_length=50)),
                ('supplier', models.CharField(max_length=50)),
                ('quantity', models.PositiveIntegerField(blank=True, default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('room_number', models.CharField(max_length=10)),
                ('building_name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('chemicals', models.ManyToManyField(to='administration.Chemical')),
                ('glasswares', models.ManyToManyField(to='administration.Glassware')),
                ('instruments', models.ManyToManyField(to='administration.Instrument')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
    ]
