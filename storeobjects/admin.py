from django.contrib import admin

from .models import (
    Chemical,
    Glassware,
    Instrument,
    Manufacturer,
    Supplier,
    ChemicalObj,
    GlasswareObj,
    InstrumentObj
)

admin.site.register(Chemical)
admin.site.register(Glassware)
admin.site.register(Instrument)
admin.site.register(Manufacturer)
admin.site.register(Supplier)
admin.site.register(ChemicalObj)
admin.site.register(GlasswareObj)
admin.site.register(InstrumentObj)

