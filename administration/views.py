import random

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from administration.models import Chemical, Glassware, Instrument, Store
from administration.serializers import (
    ChemicalSerializer,
    GlasswareSerializer,
    InstrumentSerializer,
    StoreSerializer,
)

from thefuzz import fuzz
from itertools import chain


class ChemicalViewSet(ModelViewSet):
    queryset = Chemical.objects.all()
    serializer_class = ChemicalSerializer


class GlasswareViewSet(ModelViewSet):
    queryset = Glassware.objects.all()
    serializer_class = GlasswareSerializer


class InstrumentViewSet(ModelViewSet):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer


class StoreViewSet(ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


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
    pass