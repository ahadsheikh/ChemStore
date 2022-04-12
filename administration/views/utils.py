from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from administration.models import consumer_type_choices
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def consumer_store_types(request):
    """
    Return List of Consumer types.
    """
    res = {}
    for types in consumer_type_choices:
        res[types[0]] = types[1]

    return Response(res)
