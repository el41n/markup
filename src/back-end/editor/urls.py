from django.urls import include, path, re_path
from allauth.account.views import ConfirmEmailView
from rest_auth.registration.views import VerifyEmailView, RegisterView, ConfirmEmailView

from .views import UserListView, null_view, succes_email_confirm

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/account-email-verification-sent/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('rest-auth/registration/account-confirm-email/(?P<key>[-/\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
    path('users/', UserListView.as_view()),
]