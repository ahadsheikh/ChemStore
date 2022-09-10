from django.db import models


# class Chemical1:
#     CAS_RN = models.CharField(max_length=10, unique=True)
#     name = models.CharField(max_length=300)
#     molecular_formula = models.CharField(max_length=300)
#     molecular_weight = models.FloatField(blank=True)
#
#
# class Purity:
#     percentage = models.FloatField()
#     solution_name = models.CharField(max_length=50, default='Water')
#
# class Manufacturer:
#     name = models.CharField(max_length=50)
#
#
# class Supplier:
#     name = models.CharField(max_length=50)
#
#
# class State:
#     name = models.CharField(max_length=50)
#
#
# class ChemObject:
#     chemical = models.ForeignKey(Chemical1, on_delete=models.RESTRICT)


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
    quantity = models.FloatField(default=0.0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.quantity}"


class Glassware(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=50)
    supplier = models.CharField(max_length=50)
    size = models.CharField(max_length=50, blank=True)
    material_type = models.CharField(max_length=50, default="Unknown", blank=True)
    quantity = models.PositiveIntegerField(default=0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.quantity}"


class Instrument(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=50)
    supplier = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField(default=0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.quantity}"


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


shipment_choices = (
    ('CHEMICAL', 'Chemical'),
    ('GLASSWARE', 'Glassware'),
    ('INSTRUMENT', 'Instrument')
)


class Shipment(models.Model):
    shipment_type = models.CharField(choices=shipment_choices, max_length=10, default='CHEMICAL')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shipment {self.id}"


class ChemicalShipment(models.Model):
    chemical = models.ForeignKey(Chemical, on_delete=models.PROTECT)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    old_total = models.FloatField()
    quantity = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chemical Shipment with quantity {self.quantity}"


class GlasswareShipment(models.Model):
    glassware = models.ForeignKey(Glassware, on_delete=models.PROTECT)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    old_total = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Glassware Shipment with quantity {self.quantity}"


class InstrumentShipment(models.Model):
    instrument = models.ForeignKey(Instrument, on_delete=models.PROTECT)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    old_total = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Instrument Shipment with quantity {self.quantity}"


# Model for Temporary Shipment data
class ChemicalTempShipment(models.Model):
    chemical = models.ForeignKey(Chemical, on_delete=models.PROTECT)
    is_new_obj = models.BooleanField(default=False)
    quantity = models.FloatField()


# Model for Temporary Shipment data
class GlasswareTempShipment(models.Model):
    glassware = models.ForeignKey(Glassware, on_delete=models.PROTECT)
    is_new_obj = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField()


# Model for Temporary Shipment data
class InstrumentTempShipment(models.Model):
    instrument = models.ForeignKey(Instrument, on_delete=models.PROTECT)
    is_new_obj = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField()


consumer_type_choices = (
        ('PHYSICAL', 'Physical Lab'),
        ('ORGANIC', 'Organic Lab'),
        ('INORGANIC', 'Inorganic Lab'),
        ('PERSONAL', 'Personal')
    )


# This model is used for different types of Lab and Personal Researchers who used the system
class StoreConsumer(models.Model):
    name = models.CharField(max_length=100)
    consumer_type = models.CharField(max_length=20, choices=consumer_type_choices)
    room_number = models.CharField(max_length=10)
    building_name = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Issue(models.Model):
    store_consumer = models.ForeignKey(StoreConsumer, on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Store Issue {self.id}"


object_type_choices = (
    ('CHEMICAL', 'Chemical'),
    ('GLASSWARE', 'Glassware'),
    ('INSTRUMENT', 'Instrument'),
)


class IssueObject(models.Model):
    object_id = models.PositiveBigIntegerField()
    object_type = models.CharField(max_length=10, choices=object_type_choices)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    old_total = models.FloatField()
    quantity = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Issue with quantity {self.quantity}"


class IssueCart(models.Model):
    object_id = models.PositiveBigIntegerField()
    object_type = models.CharField(max_length=10, choices=object_type_choices)
    quantity = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.object_type} of {self.id} with quantity {self.quantity}"
