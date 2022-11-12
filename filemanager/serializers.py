from rest_framework import serializers

from storeobjects.serializers import ChemicalSerializer
from .models import Category, File


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name']


class FileSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    chemicals = ChemicalSerializer(many=True, read_only=True)

    class Meta:
        model = File
        fields = ['id', 'categories', 'chemicals', 'file', 'created_at']


class FileSerializerCreate(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ['id', 'categories', 'chemicals', 'file']
