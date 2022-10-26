from rest_framework import serializers

from storeobjects import models


class ChemicalSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Chemical
        fields = ['id', 'CAS_RN', 'name', 'molecular_formula', 'molecular_weight']


class GlasswareSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Glassware
        fields = ['id', 'name']


class InstrumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Instrument
        fields = ['id', 'name']


class ManufacturerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Manufacturer
        fields = ['id', 'name']


class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Supplier
        fields = ['id', 'name']


class ChemicalObjSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChemicalObj
        fields = ['id', 'chemical', 'purity',
                  'manufacturer', 'supplier', 'state', 'quantity']


class GlasswareObjSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.GlasswareObj
        fields = ['id', 'glassware', 'manufacturer', 'supplier', 'size', 'material_type', 'quantity']


class InstrumentObjSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.InstrumentObj
        fields = ['id', 'instrument', 'manufacturer', 'supplier', 'quantity']
