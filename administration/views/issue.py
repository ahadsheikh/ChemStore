from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from administration.models import IssueCart, StoreConsumer, Chemical, Instrument, Glassware, Issue, IssueObject
from administration.serializers.issue import IssueCartSerializer


class IssueCartViewSet(viewsets.ModelViewSet):
    queryset = IssueCart.objects.all()
    serializer_class = IssueCartSerializer

    def issue_helper(self, obj, issue_cart, issue):
        IssueObject.objects.create(
            object_id=obj.id,
            object_type=issue_cart.object_type,
            issue=issue,
            old_total=obj.quantity,
            quantity=issue_cart.quantity
        )
        obj.quantity -= issue_cart.quantity
        obj.save()

    @action(detail=True, methods=['POST'])
    def merge(self, request, pk):
        consumer = get_object_or_404(StoreConsumer, pk=pk)
        issue = Issue.objects.create(store_consumer=consumer)

        issue_carts = IssueCart.objects.all()
        for issue_cart in issue_carts:
            if issue_cart.object_type == 'CHEMICAL':
                try:
                    obj = Chemical.objects.get(pk=issue_cart.object_id)
                    self.issue_helper(obj, issue_cart, issue)
                except Chemical.DoesNotExist:
                    return Response({'error': f'Chemical {issue_cart.object_id} does not exist'}, status=404)

            elif issue_cart.object_type == 'GLASSWARE':
                try:
                    obj = Glassware.objects.get(pk=issue_cart.object_id)
                    self.issue_helper(obj, issue_cart, issue)
                except Glassware.DoesNotExist:
                    return Response({'error': f'Glassware {issue_cart.object_id} does not exist'}, status=404)

            elif issue_cart.object_type == 'INSTRUMENT':
                try:
                    obj = Instrument.objects.get(pk=issue_cart.object_id)
                    self.issue_helper(obj, issue_cart, issue)
                except Instrument.DoesNotExist:
                    return Response({'error': f'Instrument {issue_cart.object_id} does not exist'}, status=404)

            else:
                pass

            issue_cart.delete()
        return Response({'success': 'Issue cart merged successfully'}, status=200)
