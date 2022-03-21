from rest_framework import serializers


class loginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length = 100)
    password = serializers.CharField(max_length = 100)

class RegSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length = 100)
    last_name = serializers.CharField(max_length = 100)
    email = serializers.CharField(max_length = 100)
    password = serializers.CharField(max_length = 100)


class GetLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length = 100)
    password = serializers.CharField(max_length = 100)
    serialid = serializers.CharField(max_length = 100)


class GetCommandSerializer(serializers.Serializer):
    udn = serializers.CharField(max_length=100)
    gpio = serializers.IntegerField()