from django.conf.urls import url
from django.conf.urls import include
# from django.urls import path

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('viewsets', views.viewSets, base_name='viewsets')
router.register('profile', views.UserProfileViewSet)
# router.register('create/', views.ProfileCreateView)
router.register('login',views.LoginViewSet, base_name='login')
router.register('feed',views.UserProfileFeedViewSet)
router.register('menu', views.MenuList, base_name='menu')

urlpatterns = [
    url(r'^hello-view/',views.HelloApiView.as_view()),
    url('create/', views.ProfileCreateView.as_view()),
    url('<pk>/update/', views.ProfileUpdateView.as_view()),
    url('<pk>/delete/', views.ProfileDeleteView.as_view()),
    url(r'', include(router.urls)),
    ]
