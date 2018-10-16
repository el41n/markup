from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import CustomUser
from ..serializers import UserSerializer


class UserListView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


@api_view()
def null_view(request):
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view()
def succes_email_confirm(request):
    return Response('Email confirmed')
