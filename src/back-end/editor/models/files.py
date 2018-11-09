from django.db import models

from .custom_user import CustomUser


class File(models.Model):

    created = models.DateField(auto_now_add=True)
    title = models.CharField(max_length=128, blank=False)
    text = models.TextField(blank=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_files')

    class Meta:
        ordering = ('created', )
        permissions = (
            ('r_file', 'Read existing file'),
            ('rw_file', 'Read and save file'),
            ('rm_file', 'Delete file')
        )

    def __str__(self):
        return self.title
