from django import views
from django.urls import path,include, re_path
from django.urls import re_path
from . import views


urlpatterns = [
    path('signup', views.signup),
    path('login', views.login),
    path('token_refresh', views.token_refresh),
    path('logout' , views.logout),
    path('getprofile',views.get),
]