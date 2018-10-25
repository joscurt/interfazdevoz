from rest_framework import serializers

from . import models


class HelloSerializer(serializers.Serializer):

    nombre = serializers.CharField(max_length=10)


class UserProfilesSerializer(serializers.ModelSerializer):
    """ Serializador para nuestro usuario"""

    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'nombre', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = models.UserProfile(
            email = validated_data['email'],
            nombre = validated_data['nombre'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class ProfileFeedItemSerializer(serializers.ModelSerializer):
    """Serializador para los items"""

    class Meta:
        model = models.ProfileFeedItem
        fields = ('id','user_profile', 'status_text', 'created_on')
        extra_kwargs = {'user_profile':{'read_only': True}}
