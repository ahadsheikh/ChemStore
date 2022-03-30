from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from administration.models import ChemicalTempShipment, GlasswareTempShipment, InstrumentTempShipment
from administration.serializers.shipment import (
    ChemicalTempShipmentSerializer, ChemicalTempShipmentCreateSerializer,
    GlasswareTempShipmentSerializer, GlasswareTempShipmentCreateSerializer,
    InstrumentTempShipmentSerializer, InstrumentTempShipmentCreateSerializer
)


class ChemicalTempShipmentViewSet(ModelViewSet):
    queryset = ChemicalTempShipment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return ChemicalTempShipmentCreateSerializer
        elif self.action == 'update':
            return ChemicalTempShipmentCreateSerializer
        else:
            return ChemicalTempShipmentSerializer


class GlasswareTempShipmentViewSet(ModelViewSet):
    queryset = GlasswareTempShipment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return GlasswareTempShipmentCreateSerializer
        elif self.action == 'update':
            return GlasswareTempShipmentCreateSerializer
        else:
            return GlasswareTempShipmentSerializer


class InstrumentTempShipmentViewSet(ModelViewSet):
    queryset = InstrumentTempShipment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return InstrumentTempShipmentCreateSerializer
        elif self.action == 'update':
            return InstrumentTempShipmentCreateSerializer
        else:
            return InstrumentTempShipmentSerializer