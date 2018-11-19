from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .user_forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, File, SharedFile


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'username', 'avatar']


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(File)
admin.site.register(SharedFile)