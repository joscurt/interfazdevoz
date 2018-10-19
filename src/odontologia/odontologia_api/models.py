from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager

# Create your models here.

class UserProfileManager(BaseUserManager):
    """Para que Django funcione con nuestro modelo de usuario customizado"""

    def create_user(self, email, nombre, password=None):
        """Creaciòn de Usuario"""
        if not email:
            raise ValueError('Debes tener una direcciòn de Correo.')

        email = self.normalize_email(email)
        user = self.model(email=email, nombre=nombre)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, nombre, password):
        """Creaciòn de un super usuario"""

        user = self.create_user(email, nombre, password)

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)

        return user

class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Representa los perfiles de Usuario del sistema."""

    email = models.EmailField(max_length=255, unique=True)
    nombre = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD =  'email'
    REQUIRED_FIELDS = ['nombre']

    def get_full_name(self):
        """ Funcion para obtener todo el nombre de usuario"""

        return self.nombre

    def get_short_name(self):
        """Para obtener el solo el nombre"""

        return self.nombre


    def __str__(self):
        """Django para convertir un objeto a string"""

        return self.email
