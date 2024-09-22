from rest_framework import serializers


class AddUserPropertySerializer(serializers.Serializer):
    name = serializers.CharField()
