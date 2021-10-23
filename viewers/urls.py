from django.urls import path
import viewers.views as views

urlpatterns = [
    path('', view=views.index, name='index'),
]
