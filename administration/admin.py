from django.contrib import admin

from .models import (
    Building,
    Store,
    Shipment,
    ChemicalShipment,
    GlasswareShipment,
    InstrumentShipment,
    ChemicalTempShipment,
    GlasswareTempShipment,
    InstrumentTempShipment,
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
admin.site.register(ChemicalTempShipment)
admin.site.register(GlasswareTempShipment)
admin.site.register(InstrumentTempShipment)
admin.site.register(StoreConsumer)
admin.site.register(Issue)
admin.site.register(IssueObject)
admin.site.register(IssueCart)
