from rest_framework import serializers

from administration.models import ChemicalTempShipment, GlasswareTempShipment, InstrumentTempShipment
from administration.serializers.serializers import ChemicalSerializer, GlasswareSerializer, InstrumentSerializer


class ChemicalTempShipmentSerializer(serializers.ModelSerializer):
    chemical = ChemicalSerializer()

    class Meta:
        model = ChemicalTempShipment
        fields = ['id', 'chemical', 'is_new_obj', 'quantity']


class ChemicalTempShipmentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChemicalTempShipment
        fields = ['chemical', 'is_new_obj', 'quantity']

    def create(self, validated_data):
        if validated_data.get('quantity') < 1:
            raise serializers.ValidationError({'detail': 'Chemical quantity need to be more than 1'})

        return ChemicalTempShipment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if validated_data.get('quantity') < 1:
            raise serializers.ValidationError({'detail': 'Chemical quantity need to be more than 1'})

        instance.chemical = validated_data.get('chemical', instance.chemical)
        instance.is_new_obj = validated_data.get('is_new_obj', instance.is_new_obj)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance


class GlasswareTempShipmentSerializer(serializers.ModelSerializer):
    glassware = GlasswareSerializer()

    class Meta:
        model = GlasswareTempShipment
        fields = ['id', 'glassware', 'is_new_obj', 'quantity']


class GlasswareTempShipmentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = GlasswareTempShipment
        fields = ['glassware', 'is_new_obj', 'quantity']

    def create(self, validated_data):
        if validated_data.get('quantity') < 1:
            raise serializers.ValidationError({'detail': 'Glassware quantity need to be more than 1'})

        return GlasswareTempShipment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if validated_data.get('quantity') < 1:
            raise serializers.ValidationError({'detail': 'Glassware quantity need to be more than 1'})

        instance.glassware = validated_data.get('glassware', instance.glassware)
        instance.is_new_obj = validated_data.get('is_new_obj', instance.is_new_obj)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance


class InstrumentTempShipmentSerializer(serializers.ModelSerializer):
    instrument = InstrumentSerializer()

    class Meta:
        model = InstrumentTempShipment
        fields = ['id', 'instrument', 'is_new_obj', 'quantity']


class InstrumentTempShipmentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = InstrumentTempShipment
        fields = ['instrument', 'is_new_obj', 'quantity']

    def create(self, validated_data):
        if validated_data.get('quantity') < 1:
            raise serializers.ValidationError({'detail': 'Instrument quantity need to be more than 1'})
        return InstrumentTempShipment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if validated_data.get('quantity') < 1:
            raise serializers.ValidationError({'detail': 'Instrument quantity need to be more than 1'})

        instance.instrument = validated_data.get('instrument', instance.instrument)
        instance.is_new_obj = validated_data.get('is_new_obj', instance.is_new_obj)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance
