from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.conf import settings
from allauth.account.views import ConfirmEmailView
from allauth.account.views import confirm_email as allauthemailconfirmation
from rest_auth.registration.views import VerifyEmailView, RegisterView, ConfirmEmailView
from .views import UserList, UserDetail, FileList, FileDetail, success_email_confirm

urlpatterns = [
    re_path(r'^auth/registrationaccount-confirm-email/(?P<key>[-:\w]+)/$', success_email_confirm,
         name='account_confirm_email'),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration', include('rest_auth.registration.urls')),
    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/account-email-verification-sent/', VerifyEmailView.as_view(), name='account_email_verification_sent'),

    path('users/', UserList.as_view()),
    path('users/detail', UserDetail.as_view()),
    path('files/', FileList.as_view()),
    path('files/<int:pk>', FileDetail.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
