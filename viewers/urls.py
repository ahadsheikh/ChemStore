from django.urls import path

from .views import (
    issues
)

urlpatterns = [
    path('issues/<int:consumer_id>/', view=issues, name='issues'),
]
