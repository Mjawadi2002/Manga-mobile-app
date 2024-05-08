from django.http import JsonResponse
from .models import CartItem
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['POST'])
def add_to_cart(request):
    if request.method == 'POST':
        name = request.data.get('name')
        price = request.data.get('price')
        # Add other necessary fields

        cart_item = CartItem.objects.create(
            name=name,
            price=price,
            # Assign other field values
        )

        return JsonResponse({'success': True}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'success': False}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_cart_items(request):
    cart_items = CartItem.objects.all().values()
    return JsonResponse({'cart_items': list(cart_items)}, safe=False)


@api_view(['POST'])
def buy_item(cart_item_id):
    try:
        cart_item = CartItem.objects.get(id=cart_item_id)
    except CartItem.DoesNotExist:
        return JsonResponse({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Implement your logic for buying the item here
    # For example, you can update the cart item status to 'bought'
    
    return JsonResponse({'success': True})

@api_view(['DELETE'])
def delete_item(request):
    if request.method == 'DELETE':
        cart_item_id = request.GET.get('cartItemId')  # Retrieve the cartItemId from the query parameters
        # Perform deletion logic based on the cartItemId
        CartItem.objects.filter(id=cart_item_id).delete()

        return JsonResponse({'success': True}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'success': False}, status=status.HTTP_400_BAD_REQUEST)
