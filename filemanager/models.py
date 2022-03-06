from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class File(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    file = models.FileField(upload_to='files/')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
