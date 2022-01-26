from rest_framework.serializers import ModelSerializer

from administration.models import Chemical, Glassware, Instrument, Store, Shipment


class ChemicalSerializer(ModelSerializer):

    class Meta:
        model = Chemical
        fields = ['id', 'CAS_RN', 'name', 'molecular_formula', 'molecular_weight', 'purity',
                  'manufacturer', 'supplier', 'state', 'amount']


class GlasswareSerializer(ModelSerializer):

    class Meta:
        model = Glassware
        fields = ['id', 'name', 'manufacturer', 'supplier', 'size', 'material_type', 'quantity']


class InstrumentSerializer(ModelSerializer):

    class Meta:
        model = Instrument
        fields = ['id', 'name', 'manufacturer', 'supplier', 'quantity']


class StoreSerializer(ModelSerializer):

    class Meta:
        model = Store
        fields = ['id', 'name', 'room_number', 'building_name', 'chemicals', 'glasswares', 'instruments']
