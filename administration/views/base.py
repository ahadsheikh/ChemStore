from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework import serializers
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

from thefuzz import fuzz
from itertools import chain

from administration.serializers import (
    ChemicalSerializer,
    GlasswareSerializer,
    InstrumentSerializer,
    StoreSerializer,
    ChemicalCreateSerializer,
    AddShipmentSerializer, ShipmentSerializer, MakeIssueSerializer, StoreConsumerSerializer, ChemicalUpdateSerializer,
    GlasswareCreateSerializer, InstrumentCreateSerializer
)

from administration.models import (
    Chemical, Glassware, Instrument, Store, Shipment,
    ChemicalShipment,
    GlasswareShipment,
    InstrumentShipment, StoreIssue, StoreConsumer, ChemicalIssue, GlasswareIssue, InstrumentIssue
)
from core.utils import molar_mass


class ChemicalViewSet(ModelViewSet):
    queryset = Chemical.objects.all()

    def get_serializer_class(self):
        print(self.action)
        if self.action == 'create':
            return ChemicalCreateSerializer
        elif self.action == 'update':
            return ChemicalUpdateSerializer
        else:
            return ChemicalSerializer


class GlasswareViewSet(ModelViewSet):
    queryset = Glassware.objects.all()

    def get_serializer_class(self):
        print(self.action)
        if self.action == 'create':
            return GlasswareCreateSerializer
        else:
            return GlasswareSerializer


class InstrumentViewSet(ModelViewSet):
    queryset = Instrument.objects.all()

    def get_serializer_class(self):
        print(self.action)
        if self.action == 'create':
            return InstrumentCreateSerializer
        else:
            return InstrumentSerializer


class StoreViewSet(ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

    @action(detail=True, methods=['GET'])
    def chemicals(self, request, pk):
        """
        List all chemical in a store
        """
        store = get_object_or_404(Store, pk=pk)
        chemicals = store.chemicals.all()

        chem_datas = ChemicalSerializer(instance=chemicals, many=True)

        return Response(chem_datas.data)

    @action(detail=True, methods=['GET'])
    def glasswares(self, request, pk):
        """
        List all glassware in a store
        """
        store = get_object_or_404(Store, pk=pk)
        glasswares = store.glasswares.all()

        glass_datas = GlasswareSerializer(instance=glasswares, many=True)

        return Response(glass_datas.data)

    @action(detail=True, methods=['GET'])
    def instruments(self, request, pk):
        """
        List all instrument in a store
        """
        store = get_object_or_404(Store, pk=pk)
        instruments = store.instruments.all()

        instru_datas = InstrumentSerializer(instance=instruments, many=True)

        return Response(instru_datas.data)


class StoreConsumerViewset(ModelViewSet):
    queryset = StoreConsumer.objects.all()
    serializer_class = StoreConsumerSerializer

    def list(self, request, *args, **kwargs):
        param = request.GET.get('type', None)
        objects = StoreConsumer.objects.all()
        if param:
            objects = objects.filter(consumer_type=param)
        serializer = StoreConsumerSerializer(objects, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def consumers_tree(request):
    """
    return all consumers by consumer type category
    """
    pLabs = StoreConsumer.objects.filter(consumer_type='PHYSICAL').values('id', 'name')
    orLabs = StoreConsumer.objects.filter(consumer_type='ORGANIC').values('id', 'name')
    inLabs = StoreConsumer.objects.filter(consumer_type='INORGANIC').values('id', 'name')
    perLabs = StoreConsumer.objects.filter(consumer_type='PERSONAL').values('id', 'name')

    class DataSerializer(serializers.ModelSerializer):
        class Meta:
            model = StoreConsumer
            fields = ['id', 'name']

    res = {
        'PhysicalLab': DataSerializer(pLabs, many=True).data,
        'OrganicLab': DataSerializer(orLabs, many=True).data,
        'InorganicLab': DataSerializer(inLabs, many=True).data,
        'Personal': DataSerializer(perLabs, many=True).data
    }

    return Response(res)


def fuzzy_util(objects, query, limit=10, with_score=False):
    """
    objects: list of objects to search
    query: string to search for
    limit: number of results to return
    with_score: return a tuple of (object, score) if False(default)
                        otherwise return object with score and limit will be ignored
    Returns a list of objects that match the given query.
    """

    h_objects = []
    for obj in objects:
        h_objects.append((-fuzz.ratio(query, obj.name), obj))

    h_objects = sorted(h_objects, key=lambda x: x[0])

    # if with_score is True then return a tuple of (score, object)
    if with_score:
        return h_objects

    output = []
    for index, obj in enumerate(h_objects):
        output.append(obj[1])
        if index == limit-1:
            break

    return output


@api_view(['GET'])
def fuzzy_search(request):
    """
    Query Params:
    type: "chemical/glassware/instrument",
    query: "query string"

    Returns a response of chemicals that match the given query.
    """
    query = request.GET.get('query')
    type_ = request.GET.get('type')

    if query:
        serializer = None
        limit = 10
        if type_ == 'chemical':
            objects = Chemical.objects.all()
            h_obj = fuzzy_util(objects, query, limit)
            serializer = ChemicalSerializer(h_obj, many=True)
        elif type_ == 'glassware':
            objects = Glassware.objects.all()
            h_obj = fuzzy_util(objects, query, limit)
            serializer = GlasswareSerializer(h_obj, many=True)
        elif type_ == 'instrument':
            objects = Instrument.objects.all()
            h_obj = fuzzy_util(objects, query, limit)
            serializer = InstrumentSerializer(h_obj, many=True)
        # search all material and join them in a list
        elif type_ is None:
            chem = Chemical.objects.all()
            h_chem = fuzzy_util(chem, query, limit, with_score=True)
            glass = Glassware.objects.all()
            h_glass = fuzzy_util(glass, query, limit, with_score=True)
            instrument = Instrument.objects.all()
            h_instrument = fuzzy_util(instrument, query, limit, with_score=True)
            objects = list(chain(h_chem, h_glass, h_instrument))
            objects = sorted(objects, key=lambda x: x[0])
            data_l = []
            i = 0
            for obj in objects:

                if isinstance(obj[1], Chemical):
                    data_l.append(ChemicalSerializer(obj[1]).data)
                elif isinstance(obj[1], Glassware):
                    data_l.append(GlasswareSerializer(obj[1]).data)
                elif isinstance(obj[1], Instrument):
                    data_l.append(InstrumentSerializer(obj[1]).data)

                i += 1
                if i == limit:
                    break
            return Response(data_l)

        else:
            return Response({"error": "Invalid type"}, status=400)

        return Response(serializer.data)
    else:
        return Response([])


@api_view(['POST'])
def add_shipment(request):
    """
    Return a shipment, Check Doc;
    """
    serializer = AddShipmentSerializer(data=request.data)
    res = {
        "errors": []
    }

    serializer.is_valid(raise_exception=True)

    note = "Note not given."
    if 'note' in serializer.validated_data:
        note = serializer.validated_data['note']

    shipment = Shipment.objects.create(
        shipment_date=serializer.validated_data['shipment_date'],
        note=note
    )

    # For chemicals
    chem_error = []
    for old in serializer.validated_data['chemical']['old']:
        try:
            chem = Chemical.objects.get(pk=old['id'])
        except ObjectDoesNotExist:
            er = {
                "id": old['id'],
                "message": "Not Found"
            }
            res['partial_update'] = True
            chem_error.append(er)
            continue

        chem_shipment = ChemicalShipment.objects.create(
            chemical=chem,
            shipment=shipment,
            old_quantity=chem.quantity,
            new_quantity=chem.quantity+old['quantity']
        )

        chem.quantity += old['quantity']
        chem.save()

    if len(chem_error) > 0:
        res['errors']['chemical'] = chem_error

    for new in serializer.validated_data['chemical']['new']:
        chem = Chemical(**new)
        chem.molecular_weight = molar_mass(chem.molecular_formula)
        chem.save()

        chem_shipment = ChemicalShipment.objects.create(
            chemical=chem,
            shipment=shipment,
            old_quantity=0,
            new_quantity=chem.quantity
        )

    # For glassware
    glass_error = []
    for old in serializer.validated_data['glassware']['old']:
        try:
            glass = Glassware.objects.get(pk=old['id'])
        except ObjectDoesNotExist:
            er = {
                "id": old['id'],
                "message": "Not Found"
            }
            res['partial_update'] = True
            glass_error.append(er)
            continue

        glass_shipment = GlasswareShipment.objects.create(
            glassware=glass,
            shipment=shipment,
            old_quantity=glass.quantity,
            new_quantity=glass.quantity + old['quantity']
        )
        glass.quantity += old['quantity']
        glass.save()

    if len(glass_error) > 0:
        res['errors']['glassware'] = glass_error

    for new in serializer.validated_data['glassware']['new']:
        glass = Glassware.objects.create(**new)
        glass_shipment = GlasswareShipment.objects.create(
            glassware=glass,
            shipment=shipment,
            old_quantity=0,
            new_quantity=glass.quantity
        )

    # For instrument
    inst_error = []
    for old in serializer.validated_data['instrument']['old']:
        try:
            inst = Instrument.objects.get(pk=old['id'])
        except ObjectDoesNotExist:
            er = {
                "id": old['id'],
                "message": "Not Found"
            }
            res['partial_update'] = True
            inst_error.append(er)
            continue

        inst_shipment = InstrumentShipment.objects.create(
            instrument=inst,
            shipment=shipment,
            old_quantity=inst.quantity,
            new_quantity=inst.quantity + old['quantity']
        )

        inst.quantity += old['quantity']
        inst.save()

    if len(inst_error) > 0:
        res['errors']['instrument'] = inst_error

    for new in serializer.validated_data['instrument']['new']:
        inst = Instrument.objects.create(**new)
        inst_shipment = InstrumentShipment.objects.create(
            instrument=inst,
            shipment=shipment,
            old_quantity=0,
            new_quantity=inst.quantity
        )

    res['shipment'] = ShipmentSerializer(shipment).data

    return Response(res)


@api_view(['POST'])
def make_issue(request):
    """
    Create an issue for materials
    """
    serializer = MakeIssueSerializer(data=request.data)

    material_type = ["CHEMICAL", "GLASSWARE", "INSTRUMENT"]

    serializer.is_valid(raise_exception=True)

    res = {
        'errors': []
    }

    try:
        consumer = StoreConsumer.objects.get(pk=serializer.validated_data['consumer_id'])
    except ObjectDoesNotExist:
        res['errors'].append("Consumer not found")
        return Response(res, status=status.HTTP_404_NOT_FOUND)

    note = "No Note"
    if 'note' in serializer.validated_data:
        note = serializer.validated_data['note']

    carrier_name = "Unknown"
    if 'carrier_name' in serializer.validated_data:
        carrier_name = serializer.validated_data['carrier_name']

    for obj in serializer.validated_data['objects']:

        if obj['material_type'] not in material_type:
            res["errors"].append("Some material type is invalid. Valid type is CHEMICAL/GLASSWARE/INSTRUMENT.")
            return Response(res, status=status.HTTP_400_BAD_REQUEST)

        flag = False

        # Checking if objects are exists in store
        if obj['material_type'] == material_type[0]:
            chem = Chemical.objects.filter(pk=obj['id'])
            if chem.exists():
                if chem[0].quantity < obj['quantity']:
                    res['errors'].append(f"{chem[0].name} is not enough.")
                    flag = True
            else:
                flag = True
                res["errors"].append("Some material is not found.")

        elif obj['material_type'] == material_type[1]:
            glass = Glassware.objects.filter(pk=obj['id'])
            if glass.exists():
                if glass[0].quantity < int(obj['quantity']):
                    res['errors'].append(f"{glass[0].name} is not enough.")
                    flag = True
            else:
                flag = True
                res["errors"].append("Some material is not found.")

        elif obj['material_type'] == material_type[2]:
            inst = Instrument.objects.filter(pk=obj['id'])
            if inst.exists():
                if inst[0].quantity < int(obj['quantity']):
                    res['errors'].append(f"{inst[0].name} is not enough.")
                    flag = True
            else:
                flag = True
                res["errors"].append("Some material is not found.")

        if flag:
            return Response(res, status=status.HTTP_400_BAD_REQUEST)

    # Creating issue object
    issue = StoreIssue.objects.create(
        issue_date=serializer.validated_data['issue_date'],
        carrier_name=carrier_name,
        note=note,
        store_consumer=consumer
    )

    for obj in serializer.validated_data['objects']:
        if obj['material_type'] == material_type[0]:
            chem = Chemical.objects.get(pk=obj['id'])
            ChemicalIssue.objects.create(
                chemical=chem,
                issue=issue,
                old_quantity=chem.quantity,
                new_quantity=chem.quantity - obj['quantity']
            )
            chem.quantity = chem.quantity - obj['quantity']
            chem.save()
        elif obj['material_type'] == material_type[1]:
            glass = Glassware.objects.get(pk=obj['id'])
            GlasswareIssue.objects.create(
                glassware=glass,
                issue=issue,
                old_quantity=glass.quantity,
                new_quantity=glass.quantity - obj['quantity']
            )
            glass.quantity = glass.quantity - obj['quantity']
            glass.save()
        elif obj['material_type'] == material_type[2]:
            inst = Instrument.objects.get(pk=obj['id'])
            InstrumentIssue.objects.create(
                instrument=inst,
                issue=issue,
                old_quantity=inst.quantity,
                new_quantity=inst.quantity - obj['quantity']
            )
            inst.quantity = inst.quantity - obj['quantity']
            inst.save()

        res['message'] = 'Issue Created'

    return Response(res)
