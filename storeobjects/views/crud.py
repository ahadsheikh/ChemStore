from rest_framework import viewsets
from rest_framework import permissions

from storeobjects import models
from storeobjects import serializers


class ChemicalViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = models.Chemical.objects.all()
    serializer_class = serializers.ChemicalSerializer


class GlasswareViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = models.Glassware.objects.all()
    serializer_class = serializers.GlasswareSerializer


class InstrumentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = models.Instrument.objects.all()
    serializer_class = serializers.InstrumentSerializer


class ManufacturerViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = models.Manufacturer.objects.all()
    serializer_class = serializers.ManufacturerSerializer


class SupplierViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = models.Supplier.objects.all()
    serializer_class = serializers.SupplierSerializer


class ChemicalObjViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = models.ChemicalObj.objects.all()
    serializer_class = serializers.ChemicalObjSerializer


class GlasswareObjViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = models.GlasswareObj.objects.all()
    serializer_class = serializers.GlasswareObjSerializer


class InstrumentObjViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = models.InstrumentObj.objects.all()
    serializer_class = serializers.InstrumentObjSerializer
