from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.decorators import login_required
from rest_framework.routers import DefaultRouter

from .views import ChemicalViewSet, GlasswareViewSet, InstrumentViewSet, StoreViewSet, fuzzy_search, add_shipment

router = DefaultRouter()
router.register(r'chemicals', ChemicalViewSet, basename='chemical')
router.register(r'glasswares', GlasswareViewSet, basename='glassware')
router.register(r'instruments', InstrumentViewSet, basename='instrument')
router.register(r'stores', StoreViewSet, basename='store')

urlpatterns = [
    # path('', login_required(AdminHome.as_view()), name="admin_home"),
    # path('login/', LoginView.as_view(template_name='administration/login.html'), name='login'),
    # path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    # path('add-things/', AddThingsPage.as_view(), name="add_things_page"),
    path('fuzzysearch/', fuzzy_search, name="fuzzy_search"),
    path('add-shipment/', add_shipment, name="add_shipment"),
]

urlpatterns += router.urls


