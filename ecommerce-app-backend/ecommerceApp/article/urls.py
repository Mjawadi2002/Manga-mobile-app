from django import views
from django.urls import path
from . import views


urlpatterns = [
    path('add_article', views.add_article),
    path('delete_article', views.delete_article),
    path('edit_article', views.edit_article),
    
]