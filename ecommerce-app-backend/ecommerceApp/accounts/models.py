from django.db import models
from django.contrib.auth.models import AbstractUser
from db_connection import db

con = db['ecommerce_app']
class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique = True)
    password = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=8, null=True)
    username = None
    USERNAME_FIELD = 'email' #cause django logs with username and password
    REQUIRED_FIELDS = []