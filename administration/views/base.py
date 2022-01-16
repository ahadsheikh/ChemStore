from django.shortcuts import render
from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.views.generic import TemplateView

from django.views import View


class AdminHome(View):
    def get(self, request):
        return render(request, 'administration/admin_panel.html')


class AddThingsPage(TemplateView):
    template_name = 'administration/add_things.html'


class Index(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, requests):
        return Response({"message": "hello world!"})
