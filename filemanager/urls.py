from rest_framework import routers
from .views import *


router = routers.DefaultRouter()

router.register(r'categories', CateforyViewset)
router.register(r'files', FileViewset, basename='files')

urlpatterns = router.urls
