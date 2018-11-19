from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.conf import settings
from .views import UserList, UserDetail, FileList, FileDetail, success_email_confirm, PermissionView

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/account-email-verification-sent/', success_email_confirm, name='account_email_verification_sent'),

    path('users/', UserList.as_view()),
    path('users/detail/', UserDetail.as_view()),
    path('files/', FileList.as_view()),
    path('files/<int:pk>', FileDetail.as_view()),
    path('permissions/', PermissionView.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
