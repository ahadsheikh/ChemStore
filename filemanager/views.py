from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import Category, File
from .serializers import CategorySerializer, FileSerializer, FileSerializerCreate


class CateforyViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class FileViewset(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    """
    list method support parameter as query.
    these query can be: category
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = FileSerializerCreate

    def get_queryset(self):
        params = self.request.query_params
        if 'category' in params:
            category = Category.objects.filter(name=params['category'])
            if len(category) > 0:
                return category[0].file_set.all()
        return File.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = FileSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = FileSerializer(queryset, many=True)
        data = serializer.data
        for ind, q in enumerate(queryset):
            path = data[ind]['file']
            data[ind]['file'] = {}
            data[ind]['file']['path'] = path
            data[ind]['file']['size'] = q.file.size/1024
        return Response(data)

