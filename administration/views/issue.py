from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from administration.models import IssueCart, StoreConsumer, Chemical, Instrument, Glassware
from administration.serializers.issue import IssueCartSerializer, MakeIssueSerializer


class IssueCartViewSet(viewsets.ModelViewSet):
    queryset = IssueCart.objects.all()
    serializer_class = IssueCartSerializer

    @action(detail=True, methods=['POST'])
    def make_issue(self, request, consumer_id):
        serializer = MakeIssueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        consumer = get_object_or_404(StoreConsumer, consumer_id)
        issue_carts = IssueCart.objects.all()
        for issue_cart in issue_carts:
            if issue_cart.object_type == 'CHEMICAL':
                try:
                    obj = Chemical.objects.get(pk=issue_cart.object_id)
                except Chemical.DoesNotExist:
                    return Response({'error': 'Object does not exist'}, status=404)

            elif issue_cart.object_type == 'GLASSWARE':
                try:
                    obj = Glassware.objects.get(pk=issue_cart.object_id)
                except Glassware.DoesNotExist:
                    return Response({'error': 'Object does not exist'}, status=404)

            elif issue_cart.object_type == 'INSTRUMENT':
                try:
                    obj = Instrument.objects.get(pk=issue_cart.object_id)
                except Instrument.DoesNotExist:
                    return Response({'error': 'Object does not exist'}, status=404)

            else:
                pass

        return Response()
