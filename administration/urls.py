from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.decorators import login_required

from .views.base import AdminHome, AddThingsPage, Index

urlpatterns = [
    path('api/', Index.as_view(), name='index'),
    path('', login_required(AdminHome.as_view()), name="admin_home"),
    path('login/', LoginView.as_view(template_name='administration/login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('add-things/', AddThingsPage.as_view(), name="add_things_page")
]

