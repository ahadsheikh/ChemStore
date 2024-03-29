from django.urls import path
from rest_framework.routers import DefaultRouter

from storeobjects.views import crud

router = DefaultRouter()
router.register(r'chemicals', crud.ChemicalViewSet, basename='chemical')
router.register(r'glasswares', crud.ChemicalViewSet, basename='glassware')
router.register(r'instruments', crud.ChemicalViewSet, basename='instrument')
router.register(r'manufacturers', crud.ManufacturerViewSet, basename='manufacturer')
router.register(r'suppliers', crud.SupplierViewSet, basename='supplier')
router.register(r'chemicalobjs', crud.ChemicalObjViewSet, basename='chemicalobj')
router.register(r'glasswareobjs', crud.GlasswareObjViewSet, basename='glasswareobj')
router.register(r'instrumentobjs', crud.InstrumentObjViewSet, basename='instrumentobj')

urlpatterns = []

urlpatterns += router.urls
