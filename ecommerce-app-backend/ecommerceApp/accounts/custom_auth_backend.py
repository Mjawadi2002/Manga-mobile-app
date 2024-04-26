from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        user_model = get_user_model()
        
        try:
            # Try to find a user matching the email or username
            user = user_model.objects.get(Q(email=email) | Q(username=email))
            
            # Check the password
            if user.check_password(password):
                return user
            else:
                return None  # Return None if password is incorrect
        except user_model.DoesNotExist:
            return None  # Return None if user is not found

