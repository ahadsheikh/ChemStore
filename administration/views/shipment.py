from django.db import transaction

from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from administration.models import ChemicalTempShipment, GlasswareTempShipment, InstrumentTempShipment, Shipment, \
    ChemicalShipment, GlasswareShipment, InstrumentShipment
from administration.serializers.shipment import (
    ChemicalTempShipmentSerializer, ChemicalTempShipmentCreateSerializer,
    GlasswareTempShipmentSerializer, GlasswareTempShipmentCreateSerializer,
    InstrumentTempShipmentSerializer, InstrumentTempShipmentCreateSerializer
)


class ChemicalTempShipmentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ChemicalTempShipment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return ChemicalTempShipmentCreateSerializer
        elif self.action == 'update':
            return ChemicalTempShipmentCreateSerializer
        else:
            return ChemicalTempShipmentSerializer

    @transaction.atomic()
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
    permission_classes = [IsAuthenticated]
    queryset = GlasswareTempShipment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return GlasswareTempShipmentCreateSerializer
        elif self.action == 'update':
            return GlasswareTempShipmentCreateSerializer
        else:
            return GlasswareTempShipmentSerializer

    @transaction.atomic()
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
    permission_classes = [IsAuthenticated]
    queryset = InstrumentTempShipment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return InstrumentTempShipmentCreateSerializer
        elif self.action == 'update':
            return InstrumentTempShipmentCreateSerializer
        else:
            return InstrumentTempShipmentSerializer

    @transaction.atomic()
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


@api_view(['GET'])
def shipments(request):
    type_ = request.GET.get('type')
    res = []

    if type_ == 'chemical':
        shipments = Shipment.objects.filter(shipment_type='CHEMICAL').order_by('-created_at')
        for shipment in shipments:
            obj = {
                'id': shipment.id,
                'date_time': shipment.created_at,
                'chemicals': []
            }
            chem_shipments = ChemicalShipment.objects.filter(shipment=shipment)
            for obj_shipment in chem_shipments:
                chem = {
                    'CAS_RN': obj_shipment.chemical.chemical.CAS_RN,
                    'name': obj_shipment.chemical.chemical.name,
                    'molecular_formula': obj_shipment.chemical.chemical.molecular_formula,
                    'molecular_weight': obj_shipment.chemical.chemical.molecular_weight,
                    'purity': obj_shipment.chemical.purity,
                    'manufacturer': obj_shipment.chemical.manufacturer.name,
                    'supplier': obj_shipment.chemical.supplier.name,
                    'state': obj_shipment.chemical.state,
                    'old_total': obj_shipment.old_total,
                    'added_quantity': obj_shipment.quantity
                }
                obj['chemicals'].append(chem)

            res.append(obj)
        return Response(res)

    elif type_ == 'glassware':
        shipments = Shipment.objects.filter(shipment_type='GLASSWARE')
        for shipment in shipments:
            obj = {
                'id': shipment.id,
                'date_time': shipment.created_at,
                'glasswares': []
            }
            glass_shipments = GlasswareShipment.objects.filter(shipment=shipment)
            for obj_shipment in glass_shipments:
                glass = {
                    'name': obj_shipment.glassware.glassware.name,
                    'manufacturer': obj_shipment.glassware.manufacturer.name,
                    'supplier': obj_shipment.glassware.supplier.name,
                    'size': obj_shipment.glassware.size,
                    'material_type': obj_shipment.glassware.material_type,
                    'old_total': obj_shipment.old_total,
                    'added_quantity': obj_shipment.quantity
                }
                obj['glasswares'].append(glass)

            res.append(obj)
        return Response(res)

    elif type_ == 'instrument':
        shipments = Shipment.objects.filter(shipment_type='INSTRUMENT')
        for shipment in shipments:
            obj = {
                'id': shipment.id,
                'date_time': shipment.created_at,
                'instruments': []
            }
            chem_shipments = InstrumentShipment.objects.filter(shipment=shipment)
            for obj_shipment in chem_shipments:
                chem = {
                    'name': obj_shipment.instrument.instrument.name,
                    'manufacturer': obj_shipment.instrument.manufacturer.name,
                    'supplier': obj_shipment.instrument.supplier.name,
                    'old_total': obj_shipment.old_total,
                    'added_quantity': obj_shipment.quantity
                }
                obj['instruments'].append(chem)

            res.append(obj)

            print(res)
        return Response(res)

    else:
        return Response({"error": "type query param needed"})

