from django.db import models

from storeobjects.models import Chemical


class Category(models.Model):
    name = models.CharField(max_length=20, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class File(models.Model):
    categories = models.ManyToManyField(Category)
    chemicals = models.ManyToManyField(Chemical)
    file = models.FileField(upload_to='files/')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
