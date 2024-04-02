from rest_framework import serializers
from .models import User
from .models import con

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('name', 'email', 'password', 'phoneNumber')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        
        # Convert instance to dictionary before inserting into MongoDB
        instance_dict = instance.__dict__
        instance_dict.pop('_state', None)  # Remove the _state attribute
        
        # Insert the dictionary representation of the instance into MongoDB
        con.insert_one(instance_dict)
        
        return instance

    
#this method will be used to update any user information except for the password field