from rest_framework import serializers
from ..models import CustomUser, File, SharedFile


class UserSerializer(serializers.ModelSerializer):

    created_files = serializers.PrimaryKeyRelatedField(many=True, queryset=File.objects.all())
    shared_files = serializers.PrimaryKeyRelatedField(many=True, queryset=SharedFile.objects.all())

    class Meta:

        model = CustomUser
        fields = ('first_name',
                  'last_name',
                  'email',
                  'username',
                  'avatar',
                  'created_files',
                  'shared_files')
