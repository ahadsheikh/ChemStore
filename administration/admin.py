from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import (
    Building,
    Store,
    Shipment,
    ChemicalShipment,
    GlasswareShipment,
    InstrumentShipment,
    StoreConsumer,
    Issue,
    IssueObject,
    IssueCart
)

admin.site.register(Building)
admin.site.register(Store)
admin.site.register(Shipment)
admin.site.register(ChemicalShipment)
admin.site.register(GlasswareShipment)
admin.site.register(InstrumentShipment)
admin.site.register(StoreConsumer)
admin.site.register(Issue)
admin.site.register(IssueObject)
admin.site.register(IssueCart)
