from rest_framework.routers import DefaultRouter
from .views import EmissionRecordViewSet


router = DefaultRouter()

router.register(r'records', EmissionRecordViewSet)

urlpatterns = router.urls