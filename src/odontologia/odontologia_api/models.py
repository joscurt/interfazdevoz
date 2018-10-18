from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

# Create your models here.

create UserProfile(AbstractBaseUser, PermissionsMixin):
    """Representa los perfiles de Usuario del sistema."""

    email = models.EmailField(max_length=255, unique=True)
    nombre = models.CharFields(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD =  'email'
    REQUIRED_FIELDS = ['nombre']

    def get_full_nombre(self):
        """ Funcion para obtener todo el nombre de usuario"""

        return self.nombre

    def get_short_nombre(self):
        """Para obtener el solo el nombre"""

        return self.nombre


    def __str__(self):
        """Django para convertir un objeto a string"""

        return self.email
