from django.db import models

from storeobjects import models as store_models

consumer_type_choices = (
        ('PHYSICAL', 'Physical Lab'),
        ('ORGANIC', 'Organic Lab'),
        ('INORGANIC', 'Inorganic Lab'),
        ('PERSONAL', 'Personal')
    )


class Building(models.Model):
    name = models.CharField(max_length=200)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Store(models.Model):
    name = models.CharField(max_length=30)
    room_number = models.SmallIntegerField()
    building = models.ForeignKey(Building, on_delete=models.RESTRICT)
    chemicals = models.ManyToManyField(store_models.ChemicalObj)
    glasswares = models.ManyToManyField(store_models.GlasswareObj)
    instruments = models.ManyToManyField(store_models.InstrumentObj)

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
    chemical = models.ForeignKey(store_models.ChemicalObj, on_delete=models.PROTECT)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    old_total = models.FloatField()
    quantity = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chemical Shipment with quantity {self.quantity}"


class GlasswareShipment(models.Model):
    glassware = models.ForeignKey(store_models.GlasswareObj, on_delete=models.PROTECT)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    old_total = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Glassware Shipment with quantity {self.quantity}"


class InstrumentShipment(models.Model):
    instrument = models.ForeignKey(store_models.InstrumentObj, on_delete=models.PROTECT)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    old_total = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Instrument Shipment with quantity {self.quantity}"


# Model for Temporary Shipment data
class ChemicalTempShipment(models.Model):
    chemical = models.ForeignKey(store_models.ChemicalObj, on_delete=models.PROTECT)
    is_new_obj = models.BooleanField(default=False)
    quantity = models.FloatField()


# Model for Temporary Shipment data
class GlasswareTempShipment(models.Model):
    glassware = models.ForeignKey(store_models.GlasswareObj, on_delete=models.PROTECT)
    is_new_obj = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField()


# Model for Temporary Shipment data
class InstrumentTempShipment(models.Model):
    instrument = models.ForeignKey(store_models.InstrumentObj, on_delete=models.PROTECT)
    is_new_obj = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField()


# This model is used for different types of Lab and Personal Researchers who used the system
class StoreConsumer(models.Model):
    name = models.CharField(max_length=100)
    consumer_type = models.CharField(max_length=20, choices=consumer_type_choices)
    room_number = models.SmallIntegerField()
    building = models.ForeignKey(Building, on_delete=models.RESTRICT)

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
