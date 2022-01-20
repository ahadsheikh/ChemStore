from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib import auth


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

    def with_perm(self, perm, is_active=True, include_superusers=True, backend=None, obj=None):
        if backend is None:
            backends = auth._get_backends(return_tuples=True)
            if len(backends) == 1:
                backend, _ = backends[0]
            else:
                raise ValueError(
                    'You have multiple authentication backends configured and '
                    'therefore must provide the `backend` argument.'
                )
        elif not isinstance(backend, str):
            raise TypeError(
                'backend must be a dotted import path string (got %r).'
                % backend
            )
        else:
            backend = auth.load_backend(backend)
        if hasattr(backend, 'with_perm'):
            return backend.with_perm(
                perm,
                is_active=is_active,
                include_superusers=include_superusers,
                obj=obj,
            )
        return self.none()


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=100, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()


class Store(models.Model):
    name = models.CharField(max_length=30)
    room_number = models.CharField(max_length=10)
    description = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.name


class Chemical(models.Model):
    STATES_CHOICES = (
        ('SOLID', 'Solid'),
        ('LIQUID', 'Liquid'),
        ('GAS', 'Gas'),
    )
    store = models.ForeignKey(Store, on_delete=models.RESTRICT)
    CAS_RN = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=300)
    molecular_formula = models.CharField(max_length=300)
    molecular_weight = models.FloatField(blank=True)
    purity = models.CharField(max_length=20, blank=True)
    manufacturer = models.CharField(max_length=50)
    supplier = models.CharField(max_length=50)
    state = models.CharField(max_length=6, choices=STATES_CHOICES)
    amount = models.FloatField(default=0.0, blank=True)

    def __str__(self):
        return self.name


class Glassware(models.Model):
    store = models.ForeignKey(Store, on_delete=models.RESTRICT)
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=50)
    supplier = models.CharField(max_length=50)
    size = models.CharField(max_length=50, blank=True)
    material_type = models.CharField(max_length=50, default="Unknown", blank=True)
    quantity = models.PositiveIntegerField(default=0, blank=True)


class Instrument(models.Model):
    store = models.ForeignKey(Store, on_delete=models.RESTRICT)
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=50)
    supplier = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField(default=0, blank=True)
