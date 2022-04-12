from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly

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
    """
    list method support parameter as query.
    these query can be: category
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = FileSerializer

    def get_queryset(self):
        params = self.request.query_params
        if 'category' in params:
            category = Category.objects.filter(name=params['category'])
            if len(category) > 0:
                return category[0].file_set.all()
        return File.objects.all()


