from django.db import models

from core.utils import molar_mass


class Chemical(models.Model):
    CAS_RN = models.CharField(max_length=12, unique=True)
    name = models.CharField(max_length=300, unique=True)
    molecular_formula = models.CharField(max_length=300)
    molecular_weight = models.FloatField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.molecular_weight = molar_mass(self.molecular_formula)
        super(Chemical, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Glassware(models.Model):
    name = models.CharField(max_length=300)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Instrument(models.Model):
    name = models.CharField(max_length=300)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Manufacturer(models.Model):
    name = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Supplier(models.Model):
    name = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ChemicalObj(models.Model):
    STATES_CHOICES = (
        ('SOLID', 'Solid'),
        ('LIQUID', 'Liquid'),
        ('GAS', 'Gas'),
        ('PLASMA', 'Plasma')
    )
    chemical = models.ForeignKey(Chemical, on_delete=models.RESTRICT)
    purity = models.PositiveSmallIntegerField()
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.RESTRICT)
    supplier = models.ForeignKey(Supplier, on_delete=models.RESTRICT)
    state = models.CharField(max_length=20, choices=STATES_CHOICES)
    quantity = models.FloatField(default=0.0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.state} - {self.chemical.name} - {self.manufacturer} - {self.supplier} - {self.quantity}ML"

    class Meta:
        unique_together = ('chemical', 'purity', 'manufacturer', 'supplier', 'state')


class GlasswareObj(models.Model):
    glassware = models.ForeignKey(Glassware, on_delete=models.RESTRICT)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.RESTRICT)
    supplier = models.ForeignKey(Supplier, on_delete=models.RESTRICT)
    size = models.PositiveIntegerField(default=0, blank=True)
    material_type = models.CharField(max_length=50, default="Unknown", blank=True)
    quantity = models.PositiveIntegerField(default=0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.size}ml - {self.glassware.name} - {self.manufacturer} - {self.supplier} - {self.quantity} pieces"

    class Meta:
        unique_together = ('glassware', 'manufacturer', 'supplier', 'size', 'material_type')


class InstrumentObj(models.Model):
    instrument = models.ForeignKey(Instrument, on_delete=models.RESTRICT)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.RESTRICT)
    supplier = models.ForeignKey(Supplier, on_delete=models.RESTRICT)
    quantity = models.PositiveIntegerField(default=0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.instrument.name} - {self.manufacturer} - {self.supplier} - {self.quantity} pieces"

    class Meta:
        unique_together = ('instrument', 'manufacturer', 'supplier')

