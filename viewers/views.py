from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.serializers import ModelSerializer

from administration.models import StoreConsumer, StoreIssue


class IssueSerializer(ModelSerializer):

    class Meta:
        model = StoreIssue
        fields = ['id', 'issue_date', 'carrier_name', 'note']


@api_view(['GET'])
def issues(request, consumer_id):
    """
    Params:
    begin: a beginning date of issues
    end: an ending date of issues

    List all issues for a consumer.

    *Note: If you don't give the `begin` and `end` query params then all object will return

    Query Params can be used as: {domain}/api/userview/issues/1/?begin=2022-02-04&end=2022-02-07
    """
    params = request.query_params
    consumer = get_object_or_404(StoreConsumer, pk=consumer_id)
    store_issues = consumer.storeissue_set.all()
    if 'begin' in params and 'end' in params:
        store_issues = store_issues.filter(issue_date__range=[params['begin'], params['end']])
    store_issues_dict = []
    for issue in store_issues:
        issue_dict = IssueSerializer(issue).data

        obj = {}  # for holding individual material issue object

        chemical_issues = issue.chemicalissue_set.all()
        chems = []
        for chem in chemical_issues:
            obj['id'] = chem.chemical.id
            obj['name'] = chem.chemical.name
            obj['quantity'] = chem.old_quantity - chem.new_quantity
            chems.append(obj)
            obj = {}

        issue_dict['chemicals'] = chems

        glassware_issues = issue.glasswareissue_set.all()
        glasses = []
        for glass_issue in glassware_issues:
            obj['id'] = glass_issue.glassware.id
            obj['name'] = glass_issue.glassware.name
            obj['quantity'] = glass_issue.old_quantity - glass_issue.new_quantity
            glasses.append(obj)
            obj = {}


        issue_dict['glasswares'] = glasses

        isntrument_issues = issue.instrumentissue_set.all()
        instruments = []
        for ins_issue in isntrument_issues:
            obj['id'] = ins_issue.instrument.id
            obj['name'] = ins_issue.instrument.name
            obj['quantity'] = ins_issue.old_quantity - ins_issue.new_quantity
            instruments.append(obj)
            obj = {}

        issue_dict['instruments'] = instruments

        store_issues_dict.append(issue_dict)

    return Response(store_issues_dict)
