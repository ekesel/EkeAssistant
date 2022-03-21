from asgiref.sync import async_to_sync
import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer,JsonWebsocketConsumer
from .models import *
from django.core import serializers as core_serializers

class DeviceConsumer(JsonWebsocketConsumer):
            
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['udn']
        self.room_group_name = 'device_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        if self.scope['user'].id == None:
            self.close()
        else:
            self.accept()
            udn = self.room_name
            device = Devices.objects.get(udn=udn,user=self.scope['user'])
            device.status = "online"
            device.save()
    
    def receive(self,text_data):
        print(text_data)
        # self.send(text_data=json.dumps({'status':'ping-pong'}))

    def disconnect(self, close_code):
        udn = self.room_name
        device = Devices.objects.get(udn=udn,user=self.scope['user'])
        device.status = "offline"
        device.save()
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    def send_command(self, event):
        self.send(text_data=json.dumps({'gpio': event['value']}))

class StatusConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['id']
        self.room_group_name = 'status_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        if self.scope['user'].id == None:
            self.close()
        else:
            self.accept()
            user = self.scope['user']
            devices = Devices.objects.filter(user=user,status="online")
            data = {}
            data['fields'] = []
            for device in devices:
                data['fields'].append(device)
            self.send(text_data=json.dumps(data, default=vars))
    
    def receive(self,text_data):
        print(text_data)
        # self.send(text_data=json.dumps({'status':'ping-pong'}))

    def disconnect(self, close_code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    def send_status(self, event):
        user = self.scope['user']
        devices = Devices.objects.filter(user=user,status="online")
        data = {}
        data['fields'] = []
        for device in devices:
            data['fields'].append(device)
        
        self.send(text_data=json.dumps(data))
