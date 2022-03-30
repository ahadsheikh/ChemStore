from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from administration.models import ChemicalTempShipment
from administration.serializers.shipment import ChemicalTempShipmentSerializer, ChemicalTempShipmentCreateSerializer


class ChemicalTempShipmentViewSet(ModelViewSet):
    queryset = ChemicalTempShipment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return ChemicalTempShipmentCreateSerializer
        elif self.action == 'update':
            return ChemicalTempShipmentCreateSerializer
        else:
            return ChemicalTempShipmentSerializer