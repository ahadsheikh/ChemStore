from abc import ABC

from django.contrib.auth import get_user_model
from rest_framework import serializers

from administration.models import Chemical, Glassware, Instrument, Store, Shipment


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