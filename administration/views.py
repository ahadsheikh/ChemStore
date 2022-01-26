from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from administration.models import Chemical
from administration.serializers import ChemicalSerializer


class Index(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, requests):
        return Response({"message": "hello world!"})


class ChemicalAPI(ModelViewSet):
    def get_queryset(self):
        return Chemical.objects.all()

    def get_serializer_class(self):
        return ChemicalSerializer

