from django.db import models
import markdown


class File(models.Model):
    created = models.DateField(auto_now_add=True)
    title = models.CharField(max_length=128, blank=False)
    text = models.TextField()

    class Meta:
        ordering = ('created', )

    def __str__(self):
        return self.title

    def convert_to_html(self):
        markdown.markdown(self.title)
