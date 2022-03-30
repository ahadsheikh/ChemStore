from rest_framework import serializers

from administration.models import ChemicalTempShipment, GlasswareTempShipment, InstrumentTempShipment


class ChemicalTempShipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChemicalTempShipment
        fields = ['id', 'chemical', 'old_total', 'quantity']


class ChemicalTempShipmentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChemicalTempShipment
        fields = ['chemical', 'quantity']

    def create(self, validated_data):
        chemical = validated_data.get('chemical')
        if chemical.quantity < validated_data.get('quantity'):
            raise serializers.ValidationError({'detail': 'Chemical quantity is not enough'})

        return ChemicalTempShipment.objects.create(old_total=chemical.quantity, **validated_data)

    def update(self, instance, validated_data):
        chemical = validated_data.get('chemical', None)
        if chemical:
            instance.chemical = chemical
            if chemical.quantity < validated_data.get('quantity', instance.quantity):
                raise serializers.ValidationError({'detail': 'Chemical quantity is not enough'})

        else:
            if instance.chemical.quantity < validated_data.get('quantity', instance.quantity):
                raise serializers.ValidationError({'detail': 'Chemical quantity is not enough'})

        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance


class GlasswareTempShipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = GlasswareTempShipment
        fields = ['id', 'glassware', 'old_total', 'quantity']


class GlasswareTempShipmentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = GlasswareTempShipment
        fields = ['glassware', 'quantity']

    def create(self, validated_data):
        glassware = validated_data.get('glassware')
        if glassware.quantity < validated_data.get('quantity'):
            raise serializers.ValidationError({'detail': 'Glassware quantity is not enough'})

        return GlasswareTempShipment.objects.create(old_total=glassware.quantity, **validated_data)

    def update(self, instance, validated_data):
        glassware = validated_data.get('glassware', None)
        if glassware:
            instance.glassware = glassware
            if glassware.quantity < validated_data.get('quantity', instance.quantity):
                raise serializers.ValidationError({'detail': 'Glassware quantity is not enough'})

        else:
            if instance.glassware.quantity < validated_data.get('quantity', instance.quantity):
                raise serializers.ValidationError({'detail': 'Glassware quantity is not enough'})

        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance


class InstrumentTempShipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = InstrumentTempShipment
        fields = ['id', 'instrument', 'old_total', 'quantity']


class InstrumentTempShipmentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = InstrumentTempShipment
        fields = ['instrument', 'quantity']

    def create(self, validated_data):
        instrument = validated_data.get('instrument')
        if instrument.quantity < validated_data.get('quantity'):
            raise serializers.ValidationError({'detail': 'Instrument quantity is not enough'})

        return InstrumentTempShipment.objects.create(old_total=instrument.quantity, **validated_data)

    def update(self, instance, validated_data):
        instrument = validated_data.get('instrument', None)
        if instrument:
            instance.instrument = instrument
            if instrument.quantity < validated_data.get('quantity', instance.quantity):
                raise serializers.ValidationError({'detail': 'Instrument quantity is not enough'})

        else:
            if instance.instrument.quantity < validated_data.get('quantity', instance.quantity):
                raise serializers.ValidationError({'detail': 'Instrument quantity is not enough'})

        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance
