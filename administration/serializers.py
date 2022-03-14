from django.contrib.auth import get_user_model
from rest_framework import serializers

from administration.models import Chemical, Glassware, Instrument, Store, Shipment, StoreConsumer
from administration.validators import compound_name_validator
from core.utils import molar_mass

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_superuser']


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']


class UserPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, write_only=True)


class ChemicalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chemical
        fields = ['id', 'CAS_RN', 'name', 'molecular_formula', 'molecular_weight', 'purity',
                  'manufacturer', 'supplier', 'state', 'amount']


class ChemicalCreateSerializer(serializers.ModelSerializer):
    molecular_formula = serializers.CharField(max_length=300, required=False, validators=[compound_name_validator])

    class Meta:
        model = Chemical
        fields = ['CAS_RN', 'name', 'purity', 'molecular_formula',
                  'manufacturer', 'supplier', 'state', 'amount']

    def create(self, validated_data):
        mf = validated_data.get('molecular_formula')
        validated_data['molecular_weight'] = molar_mass(mf)
        return Chemical.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.CAS_RN = validated_data.get('CAS_RN', instance.CAS_RN)
        instance.name = validated_data.get('name', instance.name)
        instance.molecular_formula = validated_data.get('molecular_formula', instance.molecular_formula)

        mf = validated_data.get('molecular_formula', None)
        if mf:
            instance.molecular_weight = molar_mass(mf)

        instance.purity = validated_data.get('purity', instance.purity)
        instance.manufacturer = validated_data.get('manufacturer', instance.manufacturer)
        instance.supplier = validated_data.get('supplier', instance.supplier)
        instance.state = validated_data.get('state', instance.state)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.save()
        return instance


class GlasswareSerializer(serializers.ModelSerializer):

    class Meta:
        model = Glassware
        fields = ['id', 'name', 'manufacturer', 'supplier', 'size', 'material_type', 'quantity']


class InstrumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Instrument
        fields = ['id', 'name', 'manufacturer', 'supplier', 'quantity']


class StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = ['id', 'name', 'room_number', 'building_name']


class ShipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shipment
        fields = ['id', 'shipment_date', 'note']


# Serializers for AddShipmentSerializer
class OldData(serializers.Serializer):
    id = serializers.IntegerField()
    amount = serializers.FloatField()


class ChemicalShipment(serializers.Serializer):
    old = OldData(many=True)
    new = ChemicalCreateSerializer(many=True)


class GlasswareShipment(serializers.Serializer):
    old = OldData(many=True)
    new = GlasswareSerializer(many=True)


class InstrumentShipment(serializers.Serializer):
    old = OldData(many=True)
    new = InstrumentSerializer(many=True)


class AddShipmentSerializer(serializers.Serializer):
    shipment_date = serializers.DateField()
    note = serializers.CharField(max_length=200, required=False)
    chemical = ChemicalShipment()
    glassware = GlasswareShipment()
    instrument = InstrumentShipment()


# Serializers for
class IssueSerializer(serializers.Serializer):
    """
    material_type: ["CHEMICAL", "GLASSWARE", "INSTRUMENT"]
    """
    id = serializers.IntegerField()
    material_type = serializers.CharField(max_length=10)
    amount = serializers.FloatField()


class MakeIssueSerializer(serializers.Serializer):
    issue_date = serializers.DateField()
    carrier_name = serializers.CharField(max_length=30, required=False)
    note = serializers.CharField(max_length=200, required=False)
    consumer_id = serializers.IntegerField()
    objects = IssueSerializer(many=True)


class StoreConsumerSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoreConsumer
        fields = ['id', 'name', 'consumer_type', 'room_number', 'building_name']
