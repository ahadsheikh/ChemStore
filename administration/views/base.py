from itertools import chain

from django.shortcuts import get_object_or_404

from rest_framework import serializers
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from thefuzz import fuzz

from administration.models import (
    Building, Store, StoreConsumer
)
from administration.serializers.serializers import (
    BuildingSerializer, StoreSerializer, StoreConsumerSerializer
)
from storeobjects.models import (
    Chemical, ChemicalObj, Glassware, GlasswareObj, Instrument, InstrumentObj
)
from storeobjects.serializers import (
    ChemicalObjSerializer, GlasswareObjSerializer, InstrumentObjSerializer
)


class BuildingViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer


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

        chem_datas = ChemicalObjSerializer(instance=chemicals, many=True)

        return Response(chem_datas.data)

    @action(detail=True, methods=['GET'])
    def glasswares(self, request, pk):
        """
        List all glassware in a store
        """
        store = get_object_or_404(Store, pk=pk)
        glasswares = store.glasswares.all()

        glass_datas = GlasswareObjSerializer(instance=glasswares, many=True)

        return Response(glass_datas.data)

    @action(detail=True, methods=['GET'])
    def instruments(self, request, pk):
        """
        List all instrument in a store
        """
        store = get_object_or_404(Store, pk=pk)
        instruments = store.instruments.all()

        instru_datas = InstrumentObjSerializer(instance=instruments, many=True)

        return Response(instru_datas.data)


class StoreConsumerViewset(ModelViewSet):
    permission_classes = [IsAuthenticated]
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

def chemical_fuzzy_sort(objects, query, limit=10, with_score=False):
    h_objects = []
    for obj in objects:
        name_score = (-fuzz.ratio(query, obj.chemical.name), obj)
        casrn_score = (-fuzz.ratio(query, obj.chemical.CAS_RN), obj)
        formula_score = (-fuzz.ratio(query, obj.chemical.molecular_formula), obj)

        h_objects.append(min(name_score, casrn_score, formula_score))

    h_objects = sorted(h_objects, key=lambda x: x[0])

    if with_score:
        return h_objects

    output = []
    for index, obj in enumerate(h_objects):
        output.append(obj[1])
        if index == limit - 1:
            break

    return output


def glassware_fuzzy_sort(objects, query, limit=10, with_score=False):
    h_objects = []
    for obj in objects:
        h_objects.append((-fuzz.ratio(query, obj.glassware.name), obj))

    h_objects = sorted(h_objects, key=lambda x: x[0])

    if with_score:
        return h_objects

    output = []
    for index, obj in enumerate(h_objects):
        output.append(obj[1])
        if index == limit - 1:
            break

    return output


def instrument_fuzzy_sort(objects, query, limit=10, with_score=False):
    h_objects = []
    for obj in objects:
        h_objects.append((-fuzz.ratio(query, obj.instrument.name), obj))

    h_objects = sorted(h_objects, key=lambda x: x[0])

    if with_score:
        return h_objects

    output = []
    for index, obj in enumerate(h_objects):
        output.append(obj[1])
        if index == limit - 1:
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
    limit = 10

    if query:
        if type_ == 'chemical':
            objects = ChemicalObj.objects.all()
            h_obj = chemical_fuzzy_sort(objects, query)
            serializer = ChemicalObjSerializer(h_obj, many=True)
        elif type_ == 'glassware':
            objects = GlasswareObj.objects.all()
            h_obj = glassware_fuzzy_sort(objects, query)
            serializer = GlasswareObjSerializer(h_obj, many=True)
        elif type_ == 'instrument':
            objects = InstrumentObj.objects.all()
            h_obj = instrument_fuzzy_sort(objects, query)
            serializer = InstrumentObjSerializer(h_obj, many=True)
        # search all material and join them in a list
        elif type_ is None:
            chems = ChemicalObj.objects.all()
            h_chem = chemical_fuzzy_sort(chems, query, with_score=True)

            glass = GlasswareObj.objects.all()
            h_glass = glassware_fuzzy_sort(glass, query, with_score=True)

            instrument = InstrumentObj.objects.all()
            h_instrument = instrument_fuzzy_sort(instrument, query, with_score=True)

            objects = list(chain(h_chem, h_glass, h_instrument))
            objects = sorted(objects, key=lambda x: x[0])
            data_l = []
            i = 0
            for obj in objects:
                if isinstance(obj[1], ChemicalObj):
                    data_l.append(ChemicalObjSerializer(obj[1]).data)
                    data_l[-1]['type'] = 'CHEMICAL'
                elif isinstance(obj[1], GlasswareObj):
                    data_l.append(GlasswareObjSerializer(obj[1]).data)
                    data_l[-1]['type'] = 'GLASSWARE'
                elif isinstance(obj[1], InstrumentObj):
                    data_l.append(InstrumentObjSerializer(obj[1]).data)
                    data_l[-1]['type'] = 'INSTRUMENT'

                i += 1
                if i == limit:
                    break
            return Response(data_l)

        else:
            return Response({"error": "Invalid type"}, status=400)

        return Response(serializer.data)
    else:
        return Response([])


# @api_view(['POST'])
# def add_shipment(request):
#     """
#     Return a shipment, Check Doc;
#     """
#     serializer = AddShipmentSerializer(data=request.data)
#     res = {
#         "errors": []
#     }
#
#     serializer.is_valid(raise_exception=True)
#
#     note = "Note not given."
#     if 'note' in serializer.validated_data:
#         note = serializer.validated_data['note']
#
#     shipment = Shipment.objects.create(
#         shipment_date=serializer.validated_data['shipment_date'],
#         note=note
#     )
#
#     # For chemicals
#     chem_error = []
#     for old in serializer.validated_data['chemical']['old']:
#         try:
#             chem = Chemical.objects.get(pk=old['id'])
#         except ObjectDoesNotExist:
#             er = {
#                 "id": old['id'],
#                 "message": "Not Found"
#             }
#             res['partial_update'] = True
#             chem_error.append(er)
#             continue
#
#         chem_shipment = ChemicalShipment.objects.create(
#             chemical=chem,
#             shipment=shipment,
#             old_quantity=chem.quantity,
#             new_quantity=chem.quantity+old['quantity']
#         )
#
#         chem.quantity += old['quantity']
#         chem.save()
#
#     if len(chem_error) > 0:
#         res['errors']['chemical'] = chem_error
#
#     for new in serializer.validated_data['chemical']['new']:
#         chem = Chemical(**new)
#         chem.molecular_weight = molar_mass(chem.molecular_formula)
#         chem.save()
#
#         chem_shipment = ChemicalShipment.objects.create(
#             chemical=chem,
#             shipment=shipment,
#             old_quantity=0,
#             new_quantity=chem.quantity
#         )
#
#     # For glassware
#     glass_error = []
#     for old in serializer.validated_data['glassware']['old']:
#         try:
#             glass = Glassware.objects.get(pk=old['id'])
#         except ObjectDoesNotExist:
#             er = {
#                 "id": old['id'],
#                 "message": "Not Found"
#             }
#             res['partial_update'] = True
#             glass_error.append(er)
#             continue
#
#         glass_shipment = GlasswareShipment.objects.create(
#             glassware=glass,
#             shipment=shipment,
#             old_quantity=glass.quantity,
#             new_quantity=glass.quantity + old['quantity']
#         )
#         glass.quantity += old['quantity']
#         glass.save()
#
#     if len(glass_error) > 0:
#         res['errors']['glassware'] = glass_error
#
#     for new in serializer.validated_data['glassware']['new']:
#         glass = Glassware.objects.create(**new)
#         glass_shipment = GlasswareShipment.objects.create(
#             glassware=glass,
#             shipment=shipment,
#             old_quantity=0,
#             new_quantity=glass.quantity
#         )
#
#     # For instrument
#     inst_error = []
#     for old in serializer.validated_data['instrument']['old']:
#         try:
#             inst = Instrument.objects.get(pk=old['id'])
#         except ObjectDoesNotExist:
#             er = {
#                 "id": old['id'],
#                 "message": "Not Found"
#             }
#             res['partial_update'] = True
#             inst_error.append(er)
#             continue
#
#         inst_shipment = InstrumentShipment.objects.create(
#             instrument=inst,
#             shipment=shipment,
#             old_quantity=inst.quantity,
#             new_quantity=inst.quantity + old['quantity']
#         )
#
#         inst.quantity += old['quantity']
#         inst.save()
#
#     if len(inst_error) > 0:
#         res['errors']['instrument'] = inst_error
#
#     for new in serializer.validated_data['instrument']['new']:
#         inst = Instrument.objects.create(**new)
#         inst_shipment = InstrumentShipment.objects.create(
#             instrument=inst,
#             shipment=shipment,
#             old_quantity=0,
#             new_quantity=inst.quantity
#         )
#
#     res['shipment'] = ShipmentSerializer(shipment).data
#
#     return Response(res)
