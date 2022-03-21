from django.shortcuts import render
from rest_framework.decorators import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from .models import *
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync



@api_view(['POST',])
@permission_classes([])
def login(request):
    if request.method == "POST":
        serializer = loginSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                user = MyUser.objects.get(email=email)
                token = Token.objects.get(user=user).key
                data['token'] = token
                return Response(data,status=200)
            except ObjectDoesNotExist:
                data['error'] = {}
                data['error']['message'] = "User not Found"
                data['error']['description'] = "This user is not registered!"
                return Response(data,status=501)
        else:
            dat = serializer.errors
            return Response(dat,status=406)


@api_view(['POST',])
@permission_classes([])
def Register(request):
    if request.method == 'POST':
        serializer = RegSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            first_name = serializer.validated_data['first_name']
            last_name = serializer.validated_data['last_name']
            username = first_name+" "+last_name
            password = serializer.validated_data['password']
            email = serializer.validated_data['email']
            checkemail = MyUser.objects.filter(email=email)
            if not checkemail:
                user = MyUser.objects.create(username=username,email=email)
                user.set_password(password)
                user.save()
                token = Token.objects.get(user=user).key
                data['token'] = token
                data['response'] = "Successfully registered a new user"
                data['name'] = user.username
                data['email'] = user.email
                return Response(data,status=200)
            else:
                data['error'] = {}
                data['error']['message']="Email Address is already Registered!"
                data['error']['description'] = "Email already exists!"
                return Response(data,status=406)
        else:
            data = serializer.errors
            return Response(data,status=400)

@api_view(['GET',])
@permission_classes((IsAuthenticated, ))
def profile(request):
    if request.method == 'GET':
        user = request.user
        data = {}
        data['username'] = user.username
        data['email'] = user.email
        return Response(data,status=200)


@api_view(['POST',])
@permission_classes([])
def getLogin(request):
    if request.method == 'POST':
        serializer = GetLoginSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                user = MyUser.objects.get(email=email)
                token = Token.objects.get(user=user).key
                data['token'] = token
            except ObjectDoesNotExist:
                data['error'] = {}
                data['error']['message'] = "User not Found"
                data['error']['description'] = "This user is not registered!"
                return Response(data,status=501)
            serialid = serializer.validated_data['serialid']
            try:
                device = Devices.objects.get(user=user,serialid=serialid)
            except ObjectDoesNotExist:
                device = Devices.objects.create(user=user,serialid=serialid)
                device.udn = str(user.username)+str(user.id)+str(device.id)
                device.save()
            data['udn'] = device.udn
            return Response(data,status=200)
        else:
            data = serializer.errors
            return Response(data,status=406)


@api_view(['POST',])
@permission_classes((IsAuthenticated, ))
def get_command(request):
    if request.method == 'POST':
        serializer = GetCommandSerializer(data=request.data)
        if serializer.is_valid():
            udn = serializer.validated_data['udn']
            gpio = serializer.validated_data['gpio']
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                'device_%s' % udn, {
                    'type': 'send_command',
                    'value':  str(gpio),
                }
            )
            return Response(status=200)
        else:
            data = serializer.errors
            return Response(data,status=500)