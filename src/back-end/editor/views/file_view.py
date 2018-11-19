from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from guardian.decorators import permission_required_or_403
from guardian.shortcuts import assign_perm, get_objects_for_user
from rest_framework.authentication import TokenAuthentication

from ..models import File, CustomUser, FILE_PERMISSIONS
from ..serializers import FileSerializer, FileMetaSerializer

from functools import reduce

class FileList(APIView):

    def get(self, request):
        user = self.request.user
        if self.request.user.has_perm('r_file'):
            print("Has perm")
        files = File.objects.filter(author=user)
        perm = reduce(lambda acc, x: acc + ' ' + str(x[0]), FILE_PERMISSIONS, '')
        sh_files = get_objects_for_user(user, perms=['rm_file', 'r_file'], klass=File, any_perm=True)
        serializer = FileMetaSerializer(files, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            author = self.request.user
            serializer.save(author=author)
            obj = File.objects.get(pk=serializer.data.get('id'))
            assign_perm('rm_file', author, obj)
            assign_perm('rw_file', author, obj)
            c = get_objects_for_user(author, 'rm_file', File)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileDetail(APIView):

    @staticmethod
    def get_object(pk):
        try:
            return File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        file = self.get_object(pk)
        serializer = FileSerializer(file)
        return Response(serializer.data)

    def put(self, request, pk):
        file = self.get_object(pk)
        serializer = FileSerializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        file = self.get_object(pk)
        perm = request.data['permission']
        grant_user = CustomUser.objects.get(pk=request.data['grant_user'])
        assign_perm(perm, grant_user, file)
        return Response()

    def delete(self, request, pk):
        file = self.get_object(pk)
        file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
