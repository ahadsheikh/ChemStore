from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from administration.models import IssueCart, StoreConsumer, Issue, IssueObject
from storeobjects.models import ChemicalObj, GlasswareObj, InstrumentObj
from administration.serializers.issue import IssueCartSerializer
from storeobjects.serializers import InstrumentObjSerializer, GlasswareObjSerializer, ChemicalObjSerializer

class IssueCartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = IssueCart.objects.all()
    serializer_class = IssueCartSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        for i in range(len(data)):
            if data[i]['object_type'] == 'CHEMICAL':
                data[i]['object'] = ChemicalObjSerializer(ChemicalObj.objects.get(pk=data[i]['object_id'])).data
            elif data[i]['object_type'] == 'GLASSWARE':
                data[i]['object'] = GlasswareObjSerializer(GlasswareObj.objects.get(pk=data[i]['object_id'])).data
            elif data[i]['object_type'] == 'INSTRUMENT':
                data[i]['object'] = InstrumentObjSerializer(InstrumentObj.objects.get(pk=data[i]['object_id'])).data
            else:
                pass
            del data[i]['object_id']
        return Response(data)

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
                    obj = ChemicalObj.objects.get(pk=issue_cart.object_id)
                    self.issue_helper(obj, issue_cart, issue)
                except ChemicalObj.DoesNotExist:
                    return Response({'error': f'Chemical {issue_cart.object_id} does not exist'}, status=404)

            elif issue_cart.object_type == 'GLASSWARE':
                try:
                    obj = GlasswareObj.objects.get(pk=issue_cart.object_id)
                    self.issue_helper(obj, issue_cart, issue)
                except GlasswareObj.DoesNotExist:
                    return Response({'error': f'Glassware {issue_cart.object_id} does not exist'}, status=404)

            elif issue_cart.object_type == 'INSTRUMENT':
                try:
                    obj = InstrumentObj.objects.get(pk=issue_cart.object_id)
                    self.issue_helper(obj, issue_cart, issue)
                except InstrumentObj.DoesNotExist:
                    return Response({'error': f'Instrument {issue_cart.object_id} does not exist'}, status=404)

            else:
                pass

            issue_cart.delete()
        return Response({'success': 'Issue cart merged successfully'}, status=200)


@api_view(['GET'])
def issues(request, location_id):
    location = get_object_or_404(StoreConsumer, pk=location_id)
    issues = Issue.objects.filter(store_consumer=location).order_by('-created_at')

    res = []
    for issue in issues:
        issue_objects = IssueObject.objects.filter(issue=issue)

        obj = {
            'id': issue.id,
            'created_at': issue.created_at,
            'objects': []
        }

        for iss_obj in issue_objects:
            o = {}
            mat_ob = None
            if iss_obj.object_type == 'CHEMICAL':
                mat_ob = get_object_or_404(ChemicalObj, pk=iss_obj.object_id)
                o['name'] = mat_ob.chemical.name
            elif iss_obj.object_type == 'GLASSWARE':
                mat_ob = get_object_or_404(GlasswareObj, pk=iss_obj.object_id)
                o['name'] = mat_ob.glassware.name
            elif iss_obj.object_type == 'INSTRUMENT':
                mat_ob = get_object_or_404(InstrumentObj, pk=iss_obj.object_id)
                o['name'] = mat_ob.instrument.name
            else:
                return Response({"error": "Issues has wrong objects"})

            o['id'] = mat_ob.id
            o['object_type'] = iss_obj.object_type
            o['quantity'] = iss_obj.quantity

            obj['objects'].append(o)

        res.append(obj)
    return Response(res)

