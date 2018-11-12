import json

from django.views.static import Http404
from rest_framework.views import APIView, Response
from guardian.shortcuts import assign_perm, remove_perm

from ..serializers import FileSerializer, UserSerializer, PermissionSerializer
from ..models import CustomUser, File
from .file_view import FileDetail


class PermissionView(APIView):

    @staticmethod
    def load_permissions(data):
        permission = PermissionSerializer(data=data)
        if permission.is_valid():
            permission = permission.data
            try:
                user = CustomUser.objects.get(pk=permission.get('user_pk'))
                file = File.objects.get(pk=permission.get('file_pk'))
                return permission.get('permission'), user, file
            except Exception:
                raise Http404
        else:
            raise Http404

    def patch(self, request):
        permission, user, file = self.load_permissions(request.data)
        assign_perm(permission,
                    user,
                    file)
        print(user.has_perm('r_file', file))
        print(user.has_perm('rw_file', file))
        print(user.has_perm('rm_file', file))
        return Response('ok')

    def delete(self, request):
        permission, user, file = self.load_permissions(request.data)
        remove_perm(permission,
                    user,
                    file)
        print(user.has_perm('r_file', file))
        print(user.has_perm('rw_file', file))
        print(user.has_perm('rm_file', file))
        return Response('ok')
