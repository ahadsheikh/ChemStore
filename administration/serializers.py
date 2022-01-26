from rest_framework.serializers import Serializer, ModelSerializer

from administration.models import Chemical


class ChemicalSerializer(ModelSerializer):

    class Meta:
        model = Chemical
        fields = ['id', 'CAS_RN', 'name', 'molecular_formula', 'molecular_weight', 'purity',
                  'manufacturer', 'supplier', 'state', 'amount']
