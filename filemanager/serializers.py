from rest_framework import serializers

from .models import Category, File


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name']


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ['id', 'categories', 'chemicals', 'file']
