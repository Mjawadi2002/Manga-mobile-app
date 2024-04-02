# from django.shortcuts import render
# from django.contrib.auth.decorators import login_required
# from django.contrib.auth.forms import  UserCreationForm
# from django.http import HttpResponse

# # @login_required 
# # def home(request):
# #     return render(request, "home.html",{})

# # def authView(request):
# #     form = UserCreationForm(request.POST or None)
# #     if request.method == "POST":
# #         if form.is_valid():
# #             form.save()
# #         else:    
# #             form = UserCreationForm()
# #     return render(request , "registration/signup.html",{"form":form})

# def index(request):
#     return HttpResponse("<h1>App is running</1>")

# def add_person(request):
#     records = {
#         "firstname" : "nabil",
#         "lastname" : "kouki",
#     }
#     con.insert_one(records)
#     return HttpResponse("added succesfully")

# def get_all_person(request):
#     persons = con.find()
#     return HttpResponse(persons)

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import con
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt , datetime



class RegisterView(APIView):
    def post(self,request):
            serializer = UserSerializer(data = request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            con.insert_one(serializer.data)
            return Response(serializer.data)

class LoginView(APIView):
    def post(self,request):
         email = request.data['email']
         password = request.data['password']
         user = con.find_one({'email':email},{'password':password})
         if not user:
              return Response({"error":"User does not exist"},status=404)
         
         return Response({
              "message":"Success"
         })

# class LoginView(APIView):
#     def post(self,request):
#          email = request.data['email']
#          password = request.data['password']
         
#          user = con.find_one({'email':email},{'password':password})
#          if not user:
#               return Response({"error":"User does not exist"},status=404)
#          payload = {
#               'name':user.name,
#               'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
#               'int': datetime.datetime.utcnow()
#          }
#          token = jwt.encode(payload , 'secret' , algorithm='HS256').decode('utf-8')
#           response = Response()
#           response.set_cookie(key="jwt' , value=token , httponly=True)
#          response.data={
#               "jwt":token
#          }
#           return  response
class UserView(APIView):
    def get(self , request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed("Unauthentificated!!")
        try:
             payload = jwt.decode(token , 'secret' , algorithm =['HS256'])
        except jwt.ExpiredSignatureError:
             raise AuthenticationFailed("Unauthentificated") 
        user = User.objects.get(id=payload['id']).first()
        # user = con.find_one({'id':payload['id']})
        serializer = UserSerializer(user)
        return Response(serializer.data)
    

class LogoutView(APIView):
     def post(self,request):
          response = Response()   
          response.delete_cookie('jwt')
          response.data = {
               'message' : 'success'
          }
          return response