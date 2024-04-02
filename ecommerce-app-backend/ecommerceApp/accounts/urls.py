from django.urls import path,include
#from .views import authView,home
from .views import RegisterView,LoginView,UserView
from . import views
# urlpatterns = [
#     path ("",home , name="home"),
#     path ("signup/",authView , name="authView"),
#     path("accounts/", include("django.contrib.auth.urls")),
# ]
urlpatterns = [
    path('register',RegisterView.as_view()),# register view
    path('login',LoginView.as_view()),
    path('user',UserView.as_view()) 
    
]
