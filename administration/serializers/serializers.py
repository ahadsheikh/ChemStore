from rest_framework import serializers

from administration.models import Building, Store, Shipment, StoreConsumer
from storeobjects.serializers import ChemicalObjSerializer, GlasswareObjSerializer, InstrumentObjSerializer


class BuildingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Building
        fields = ['id', 'name']


class StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = ['id', 'name', 'room_number', 'building']


class ShipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shipment
        fields = ['id', 'shipment_date', 'note']


# Serializers for AddShipmentSerializer
class OldData(serializers.Serializer):
    id = serializers.IntegerField()
    quantity = serializers.FloatField()


class ChemicalObjShipment(serializers.Serializer):
    old = OldData(many=True)
    new = ChemicalObjSerializer(many=True)


class GlasswareObjShipment(serializers.Serializer):
    old = OldData(many=True)
    new = GlasswareObjSerializer(many=True)


class InstrumentObjShipment(serializers.Serializer):
    old = OldData(many=True)
    new = InstrumentObjSerializer(many=True)


class AddShipmentSerializer(serializers.Serializer):
    shipment_date = serializers.DateField()
    note = serializers.CharField(max_length=200, required=False)
    chemical = ChemicalObjSerializer()
    glassware = GlasswareObjShipment()
    instrument = InstrumentObjShipment()


class StoreConsumerSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoreConsumer
        fields = ['id', 'name', 'consumer_type', 'room_number', 'building']
