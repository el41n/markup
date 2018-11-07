from django.db import models

from .files import File
from .custom_user import CustomUser


class SharedFile(models.Model):

    file = models.ForeignKey(File, on_delete=models.CASCADE)
    user = models.ManyToManyField(CustomUser, related_name='shared_files')
