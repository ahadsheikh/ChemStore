from rest_framework import serializers

from administration.models import ChemicalTempShipment, Chemical


class ChemicalTempShipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChemicalTempShipment
        fields = ['id', 'chemical', 'old_total', 'quantity']



class ChemicalTempShipmentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChemicalTempShipment
        fields = ['chemical', 'quantity']

        def create(self, validated_data):
            print(validated_data)
            chem_id = validated_data.get('chemical')
            chemical = Chemical.objects.get(id=chem_id)

            return ChemicalTempShipment.objects.create(old_total=chemical.quantity, **validated_data)

        def update(self, instance, validated_data):
            chem_id = validated_data.get('chemical', None)
            if chem_id:
                try:
                    chemical = Chemical.objects.get(id=chem_id)
                except Chemical.DoesNotExist:
                    raise serializers.ValidationError({'detail': 'Chemical not found in the given id'})

                instance.chemical = chem_id

            instance.quantity = validated_data.get('quantity', instance.quantity)

            instance.save()

            return instance
