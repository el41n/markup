from rest_framework import serializers

from ..models import FILE_PERMISSIONS


class PermissionSerializer(serializers.Serializer):

    file_pk = serializers.IntegerField()
    user_pk = serializers.IntegerField()
    permission = serializers.ChoiceField(choices=FILE_PERMISSIONS)
