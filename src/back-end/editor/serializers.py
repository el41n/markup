from django.contrib.auth.models import User
from rest_framework import serializers

from .models import File


class TextSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True, max_length=128)
    text = serializers.CharField()

    def create(self, validated_data):
        return File.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('title', instance.text)
