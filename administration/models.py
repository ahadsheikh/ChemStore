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


class Chemical(models.Model):
    STATES_CHOICES = (
        ('SOLID', 'Solid'),
        ('LIQUID', 'Liquid'),
        ('GAS', 'Gas'),
    )
    CAS_RN = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=300)
    molecular_formula = models.CharField(max_length=300)
    molecular_weight = models.FloatField(blank=True)
    purity = models.CharField(max_length=30, blank=True)
    manufacturer = models.CharField(max_length=50)
    supplier = models.CharField(max_length=50)
    state = models.CharField(max_length=6, choices=STATES_CHOICES)
    amount = models.FloatField(default=0.0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Glassware(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=50)
    supplier = models.CharField(max_length=50)
    size = models.CharField(max_length=50, blank=True)
    material_type = models.CharField(max_length=50, default="Unknown", blank=True)
    quantity = models.PositiveIntegerField(default=0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Instrument(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=50)
    supplier = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField(default=0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Store(models.Model):
    name = models.CharField(max_length=30)
    room_number = models.CharField(max_length=10)
    building_name = models.CharField(max_length=100)
    chemicals = models.ManyToManyField(Chemical)
    glasswares = models.ManyToManyField(Glassware)
    instruments = models.ManyToManyField(Instrument)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Shipment(models.Model):
    shipment_date = models.DateField()
    note = models.CharField(max_length=200, blank=True, default="Write something about the shipment in 200 characters")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shipment {self.id}"


class ChemicalShipment(models.Model):
    chemical = models.ForeignKey(Chemical, on_delete=models.PROTECT)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    old_quantity = models.FloatField()
    new_quantity = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chemical Shipment with quantity {self.old_quantity -self.old_quantity}"


class GlasswareShipment(models.Model):
    glassware = models.ForeignKey(Glassware, on_delete=models.PROTECT)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    old_quantity = models.PositiveIntegerField()
    new_quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Glassware Shipment with quantity {self.old_quantity -self.old_quantity}"


class InstrumentShipment(models.Model):
    instrument = models.ForeignKey(Instrument, on_delete=models.PROTECT)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    old_quantity = models.PositiveIntegerField()
    new_quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Instrument Shipment with quantity {self.old_quantity -self.old_quantity}"


class StoreConsumer(models.Model):
    consumer_type_choices = (
        ('Lab', 'LAB'),
        ('Researcher', 'RESEARCHER')
    )
    name = models.CharField(max_length=100)
    consumer_type = models.CharField(max_length=20, choices=consumer_type_choices)
    room_number = models.CharField(max_length=10)
    building_name = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class StoreIssue(models.Model):
    issue_date = models.DateField()
    note = models.CharField(max_length=200, blank=True, default="Write something about the issue in 200 characters")
    store_consumer = models.ForeignKey(StoreConsumer, on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Store Issue {self.id}"


class ChemicalIssue(models.Model):
    chemical = models.ForeignKey(Chemical, on_delete=models.PROTECT)
    issue = models.ForeignKey(StoreIssue, on_delete=models.CASCADE)
    old_quantity = models.FloatField()
    new_quantity = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chemical Issue with quantity {self.new_quantity - self.old_quantity}"


class GlasswareIssue(models.Model):
    glassware = models.ForeignKey(Glassware, on_delete=models.PROTECT)
    issue = models.ForeignKey(StoreIssue, on_delete=models.CASCADE)
    old_quantity = models.PositiveIntegerField()
    new_quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Glassware Issue with quantity {self.new_quantity - self.old_quantity}"


class InstrumentIssue(models.Model):
    instrument = models.ForeignKey(Instrument, on_delete=models.PROTECT)
    issue = models.ForeignKey(StoreIssue, on_delete=models.CASCADE)
    old_quantity = models.PositiveIntegerField()
    new_quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Instrument Issue with quantity {self.new_quantity - self.old_quantity}"
