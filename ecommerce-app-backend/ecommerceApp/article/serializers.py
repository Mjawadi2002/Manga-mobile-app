from rest_framework import serializers
from .models import CartItem

class CartItemSerializer(serializers.ModelSerializer):
    # Define a custom field to represent the image URL
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'name', 'price', 'image_url']  # Include the image URL field in the fields list

    def get_image_url(self, obj):
        # Assuming 'image' is the name of the image field in the CartItem model
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None
