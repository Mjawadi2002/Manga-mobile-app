from django.urls import path
from . import views

urlpatterns = [
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('get_cart_items/', views.get_cart_items, name='get_cart_items'),
    path('buy_item/', views.buy_item, name='buy_item'),
    path('delete_item/', views.delete_item, name='delete_item'),
    # Add other URLs as needed
]
