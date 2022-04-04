from rest_framework import serializers

from administration.models import IssueCart, Chemical, Glassware, Instrument


class IssueCartSerializer(serializers.ModelSerializer):

    class Meta:
        model = IssueCart
        fields = ('id', 'object_id', 'object_type', 'is_new_obj', 'quantity')

    def is_available(self, class_name, object_id, quantity):
        try:
            obj = class_name.objects.get(pk=object_id)
            if obj.quantity < quantity or quantity < 1:
                raise serializers.ValidationError({'quantity': f'{class_name.__name__} is not enough to issue or '
                                                               f'invalid.'})
        except class_name.DoesNotExist:
            raise serializers.ValidationError(
                {'object_id': f'{class_name.__name__} does not exist'})

    def create(self, validated_data):
        obj_type = validated_data.get('object_type')
        if obj_type == 'CHEMICAL':
            self.is_available(Chemical, validated_data['object_id'], validated_data['quantity'])
        elif obj_type == 'GLASSWARE':
            self.is_available(Glassware, validated_data['object_id'], validated_data['quantity'])
        elif obj_type == 'INSTRUMENT':
            self.is_available(Instrument, validated_data['object_id'], validated_data['quantity'])
        else:
            raise serializers.ValidationError({'object_type': 'Invalid object type'})

        return IssueCart.objects.create(**validated_data)

    def update(self, instance, validated_data):
        obj_type = validated_data.get('object_type', instance.object_type)
        obj_quantity = validated_data.get('quantity', None)
        if obj_quantity:
            if obj_type == 'CHEMICAL':
                self.is_available(Chemical, validated_data['object_id'], validated_data['quantity'])
            elif obj_type == 'GLASSWARE':
                self.is_available(Glassware, validated_data['object_id'], validated_data['quantity'])
            elif obj_type == 'INSTRUMENT':
                self.is_available(Instrument, validated_data['object_id'], validated_data['quantity'])
            else:
                raise serializers.ValidationError({'object_type': 'Invalid object type'})

        instance.object_id = validated_data.get('object_id', instance.object_id)
        instance.object_type = obj_type
        instance.is_new_obj = validated_data.get('is_new_obj', instance.is_new_obj)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance
