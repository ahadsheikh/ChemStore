from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from administration.models import ChemicalTempShipment, GlasswareTempShipment, InstrumentTempShipment, Shipment, \
                                    ChemicalShipment, GlasswareShipment, InstrumentShipment
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

    @action(detail=False, methods=['POST'])
    def merge(self, request):
        """
        Merge Temporary Shipments
        """
        shipment_choices = ('CHEMICAL', 'GLASSWARE', 'INSTRUMENT')

        temp_shipments = ChemicalTempShipment.objects.all()
        shipment = Shipment.objects.create(shipment_type=shipment_choices[0])
        for temp_shipment in temp_shipments:
            ChemicalShipment.objects.create(
                chemical=temp_shipment.chemical,
                shipment=shipment,
                old_total=temp_shipment.chemical.quantity,
                quantity=temp_shipment.quantity
            )
            temp_shipment.chemical.quantity = temp_shipment.chemical.quantity + temp_shipment.quantity
            temp_shipment.chemical.save()
            temp_shipment.delete()

        return Response({'message': 'Shipment merged'})


class GlasswareTempShipmentViewSet(ModelViewSet):
    queryset = GlasswareTempShipment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return GlasswareTempShipmentCreateSerializer
        elif self.action == 'update':
            return GlasswareTempShipmentCreateSerializer
        else:
            return GlasswareTempShipmentSerializer

    @action(detail=False, methods=['POST'])
    def merge(self, request):
        """
        Merge Temporary Shipments
        """
        shipment_choices = ('CHEMICAL', 'GLASSWARE', 'INSTRUMENT')

        temp_shipments = GlasswareTempShipment.objects.all()
        shipment = Shipment.objects.create(shipment_type=shipment_choices[1])
        for temp_shipment in temp_shipments:
            GlasswareShipment.objects.create(
                glassware=temp_shipment.glassware,
                shipment=shipment,
                old_total=temp_shipment.glassware.quantity,
                quantity=temp_shipment.quantity
            )
            temp_shipment.glassware.quantity = temp_shipment.glassware.quantity + temp_shipment.quantity
            temp_shipment.glassware.save()
            temp_shipment.delete()

        return Response({'message': 'Shipment merged'})


class InstrumentTempShipmentViewSet(ModelViewSet):
    queryset = InstrumentTempShipment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return InstrumentTempShipmentCreateSerializer
        elif self.action == 'update':
            return InstrumentTempShipmentCreateSerializer
        else:
            return InstrumentTempShipmentSerializer

    @action(detail=False, methods=['POST'])
    def merge(self, request):
        """
        Merge Temporary Shipments
        """
        shipment_choices = ('CHEMICAL', 'GLASSWARE', 'INSTRUMENT')

        temp_shipments = InstrumentTempShipment.objects.all()
        shipment = Shipment.objects.create(shipment_type=shipment_choices[2])
        for temp_shipment in temp_shipments:
            InstrumentShipment.objects.create(
                instrument=temp_shipment.instrument,
                shipment=shipment,
                old_total=temp_shipment.instrument.quantity,
                quantity=temp_shipment.quantity
            )
            temp_shipment.instrument.quantity = temp_shipment.instrument.quantity + temp_shipment.quantity
            temp_shipment.instrument.save()
            temp_shipment.delete()

        return Response({'message': 'Shipment merged'})
