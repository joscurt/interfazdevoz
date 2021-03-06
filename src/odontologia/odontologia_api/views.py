from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView)

from . import serializers
from . import models
from . import permisos



class ProfileCreateView(CreateAPIView):
    queryset = models.UserProfile.objects.all()
    serializer_class = serializers.UserProfilesSerializer

class ProfileUpdateView(UpdateAPIView):
    queryset = models.UserProfile.objects.all()
    serializer_class = serializers.UserProfilesSerializer

class ProfileDeleteView(DestroyAPIView):
    queryset = models.UserProfile.objects.all()
    serializer_class = serializers.UserProfilesSerializer

class HelloApiView(APIView):
    """Test API View."""

    serializer_class = serializers.HelloSerializer

    def get(self, request, format=None):
        """Returns a list of APIView features."""

        an_apiview= [
            'Uses HTTP methods as functions (get, post, patch, put, delete)',
            'Is similar to a traditional Django View',
            'Gives you the most control over your logic',
            'Is mapped manually to URLs',
        ]

        return Response({'message': 'Hello!', 'an_apiview': an_apiview})

    def post(self, request):
        """Probando el serializer"""

        serializer = serializers.HelloSerializer(data=request.data)

        if serializer.is_valid():
            nombre = serializer.data.get('nombre')
            message = 'Hello {0}'.format(nombre)
            return Response({'message': message})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        """Updatear el objeto"""

        return Response({'method':'put'})

    def patch(self, request, pk=None):
        """Solo actualiza los campos provistos en la solicitud"""

        return Response({'method':'patch'})

    def delete(self, request, pk=None):
        return Response({'method':'delete'})


class viewSets(viewsets.ViewSet):

    serializer_class = serializers.HelloSerializer

    def list(self, request):
        a_viewset = [
            'Creando la lista',
            'Mapeo de URL Automticamente'
        ]

        return Response({'message': 'Viewset','a_viewset':a_viewset})

    def create(self, request):

        serializer = serializers.HelloSerializer(data=request.data)

        if serializer.is_valid():
            nombre = serializer.data.get('nombre')
            message = 'Hola {0}'.format(nombre)
            return Response({'message': message})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """ Recupero el objeto que necesito por ID"""

        return Response({'http_method': 'GET'})

    def update(self, request, pk=None):
        return Response({'htttp_method': 'PUT'})

    def partial_update(self, request, pk=None):
        return Response({'http_method':'PATCH'})

    def destroy(self, request, pk=None):
        return Response({'http_method': 'DELETE'})

class UserProfileViewSet(viewsets.ModelViewSet):

    serializer_class = serializers.UserProfilesSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permisos.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('nombre', 'email',)

class LoginViewSet(viewsets.ViewSet):

    serializer_class = AuthTokenSerializer

    def create(self, request):
        """Para obtener el token Vàlido"""
        return ObtainAuthToken().post(request)

class UserProfileFeedViewSet(viewsets.ModelViewSet):

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.ProfileFeedItemSerializer
    queryset = models.ProfileFeedItem.objects.all()
    permission_classes = (permisos.PostOwnStatus, IsAuthenticated)

    def perform_create(self, serializer):
        """Seteo Usuario Logueado"""

        serializer.save(user_profile=self.request.user)

class MenuList(viewsets.ModelViewSet):
    queryset = models.Menu.objects.filter(parent__isnull=True)
    serializer_class = serializers.MenuSerializer
