from rest_framework import serializers

class HelloSerializer(serializers.Serializer):

    nombre = serializers.CharField(max_length=10)
