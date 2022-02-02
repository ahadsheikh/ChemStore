from django.contrib.auth import get_user_model
from rest_framework import serializers

from administration.models import Chemical, Glassware, Instrument, Store, Shipment
from administration.validators import compound_name_validator
from core.utils import molar_mass

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']


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
        fields = ['id', 'name', 'room_number', 'building_name', 'chemicals', 'glasswares', 'instruments']


class ShipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shipment
        fields = ['id', 'date', 'chemical', 'amount', 'destination']