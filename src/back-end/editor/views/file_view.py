from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from guardian.decorators import permission_required_or_403
from guardian.shortcuts import assign_perm, get_objects_for_user

from ..models import File
from ..serializers import FileSerializer, FileMetaSerializer

class FileList(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user
        sh_files = get_objects_for_user(user, perms=['rm_file', 'r_file', 'rw_file'], klass=File, any_perm=True)
        shared_serializer = FileMetaSerializer(sh_files, many=True)
        return Response(shared_serializer.data)

    def post(self, request):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            author = self.request.user
            serializer.save(author=author)
            obj = File.objects.get(pk=serializer.data.get('pk'))
            assign_perm('rm_file', author, obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileDetail(APIView):

    permission_classes = [IsAuthenticated]

    @staticmethod
    def get_object(pk):
        try:
            return File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        file = self.get_object(pk)
        if request.user.has_perm('r_file', file) or request.user.has_perm('rw_file', file) or \
                request.user.has_perm('rm_file', file):
            serializer = FileSerializer(file)
            return Response(serializer.data)
        else:
            return Response("No permission", status=status.HTTP_403_FORBIDDEN)

    def put(self, request, pk):
        file = self.get_object(pk)
        if request.user.has_perm('rw_file', file) or request.user.has_perm('rm_file', file):
            serializer = FileSerializer(file, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("No permission", status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        file = self.get_object(pk)
        if request.user.has_perm('rm_file', file):
            file.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("No permission", status=status.HTTP_403_FORBIDDEN)