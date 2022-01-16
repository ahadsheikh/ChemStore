from rest_framework.serializers import Serializer, ModelSerializer

from administration.models import Chemical


class ChemicalSerializer(ModelSerializer):

    class Meta:
        model = Chemical
        fields = '__all__'
