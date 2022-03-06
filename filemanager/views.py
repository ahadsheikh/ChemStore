from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import mixins

from .models import Category, File
from .serializers import CategorySerializer, FileSerializer


class CateforyViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class FileViewset(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
