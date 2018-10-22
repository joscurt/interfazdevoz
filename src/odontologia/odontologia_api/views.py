from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import serializers

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
