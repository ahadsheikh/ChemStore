from django.urls import path
from rest_framework.routers import DefaultRouter

from .views.base import (
    BuildingViewSet,
    StoreViewSet,
    StoreConsumerViewset,
    fuzzy_search,
    consumers_tree
)
from .views import shipment, issue
from .views.utils import consumer_store_types

router = DefaultRouter()
router.register(r'buildings', BuildingViewSet, basename='building')
router.register(r'stores', StoreViewSet, basename='store')
router.register(r'store-consumers', StoreConsumerViewset, basename='store_consumer')
router.register(r'chemical-temp-shipment', shipment.ChemicalTempShipmentViewSet, basename='chemical_temp_shipment')
router.register(r'glassware-temp-shipment', shipment.GlasswareTempShipmentViewSet, basename='glassware_temp_shipment')
router.register(r'instrument-temp-shipment', shipment.InstrumentTempShipmentViewSet, basename='instrument_temp_shipment')
router.register(r'issue-cart', issue.IssueCartViewSet, basename='issue_cart')

urlpatterns = [
    path('fuzzysearch/', fuzzy_search, name="fuzzy_search"),
    path('consumer-store-types/', consumer_store_types, name="consumer_store_types"),
    path('consumers-tree/', consumers_tree, name='consumers_tree'),
    path('shipments/', shipment.shipments, name='shipments'),
    path('issues/<int:location_id>/', issue.issues, name='issues'),
]

urlpatterns += router.urls
