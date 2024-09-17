from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import check_password
class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, phoneNumber,  password=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, phoneNumber=phoneNumber)
        user.set_password(password)
        user.save(using=self._db)
        return user
    from django.contrib.auth.hashers import check_password

def authenticate(self, email=None, password=None):
    if email is None or password is None:
        return None

    try:
        user = self.get(email=email)
    except self.model.DoesNotExist:
        return None

    if check_password(password, user.password):
        return user

    return None



class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    phoneNumber = models.CharField(max_length=15, blank=True, null=True)
    # role = models.CharField(max_length=50, default='user')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'phoneNumber']

    def __str__(self):
        return self.username
