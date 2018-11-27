from rest_framework import serializers

from ..models import CustomUser, File, SharedFile


class UserSerializer(serializers.ModelSerializer):

    avatar = serializers.ImageField(use_url=True, allow_null=True)

    class Meta:

        model = CustomUser
        fields = ('first_name',
                  'last_name',
                  'email',
                  'username',
                  'avatar',
                  'pk')

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance
