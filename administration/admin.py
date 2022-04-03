from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import (
    Store,
    Chemical,
    Glassware,
    Instrument,
    Shipment,
    ChemicalShipment,
    GlasswareShipment,
    InstrumentShipment,
    StoreConsumer,
    Issue,
    IssueObject,
    IssueCart
)
User = get_user_model()

admin.site.register(User)
admin.site.register(Store)
admin.site.register(Chemical)
admin.site.register(Glassware)
admin.site.register(Instrument)
admin.site.register(Shipment)
admin.site.register(ChemicalShipment)
admin.site.register(GlasswareShipment)
admin.site.register(InstrumentShipment)
admin.site.register(StoreConsumer)
admin.site.register(Issue)
admin.site.register(IssueObject)
admin.site.register(IssueCart)
