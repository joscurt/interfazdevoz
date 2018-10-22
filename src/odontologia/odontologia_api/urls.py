from django.conf.urls import url
from django.conf.urls import include

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('viewsets', views.viewSets, base_name='viewsets')

urlpatterns = [
    url(r'^hello-view/',views.HelloApiView.as_view()),
    url(r'', include(router.urls))
]
