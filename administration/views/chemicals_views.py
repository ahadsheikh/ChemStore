from django.shortcuts import render
from django.views import View
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import ModelViewSet

from administration.models import Chemical
from administration.serializers import ChemicalSerializer


class ChemicalAPI(ModelViewSet):
    def get_queryset(self):
        return Chemical.objects.all()

    def get_serializer_class(self):
        return ChemicalSerializer
