from django import views
from django.urls import path,include, re_path
from django.urls import re_path

from . import views


urlpatterns = [
    path('signup', views.signup),
    path('login', views.login),
    path('test_token', views.test_token),
    path('logout' , views.logout),
]