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

from ..models.files import File
from ..serializers.file_serializer import FileSerializer


class FileList(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    #@permission_required_or_403('r_file')
    def get(self, request):
        user = self.request.user
        if self.request.user.has_perm('r_file'):
            print("Has perm")

        print(self.request.user.has_perm('r_file'))
        print(self.request.user.has_perm('rw_file'))
        print(self.request.user.has_perm('rm_file'))

        files = File.objects.all()
        serializer = FileSerializer(files, many=True)
        # shared_read_files = get_objects_for_user(user, 'r_file')

        return Response(serializer.data)

    def post(self, request):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            author = self.request.user
            serializer.save(author=author)
            obj = File.objects.get(pk=serializer.data.get('id'))
            assign_perm('rm_file', author, obj)
            assign_perm('rw_file', author, obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileDetail(APIView):

    def get_object(self, pk):
        try:
            return File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        file = self.get_object(pk)
        if self.request.user.has_perm('r_file', file):
            print('pass')
        serializer = FileSerializer(file)
        return Response(serializer.data)

    def put(self, request, pk):
        file = self.get_object(pk)
        serializer = FileSerializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        file = self.get_object(pk)
        file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
