from rest_framework.viewsets import ModelViewSet
from administration.models import Chemical, Glassware, Instrument, Store
from administration.serializers import (
    ChemicalSerializer,
    GlasswareSerializer,
    InstrumentSerializer,
    StoreSerializer,
)


class ChemicalViewSet(ModelViewSet):
    queryset = Chemical.objects.all()
    serializer_class = ChemicalSerializer


class GlasswareViewSet(ModelViewSet):
    queryset = Glassware.objects.all()
    serializer_class = GlasswareSerializer


class InstrumentViewSet(ModelViewSet):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer


class StoreViewSet(ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer



