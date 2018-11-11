from django.urls import include, path, re_path
from allauth.account.views import ConfirmEmailView
from rest_auth.registration.views import VerifyEmailView, RegisterView, ConfirmEmailView
from .views import UserList, UserDetail, FileList, FileDetail

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('auth/registration', include('rest_auth.registration.urls')),
    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
    # path('rest-auth/registration/account-email-verification-sent/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # path('rest-auth/registration/account-confirm-email/(?P<key>[-/\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
    path('users/', UserList.as_view()),
    path('users/detail', UserDetail.as_view()),
    path('files/', FileList.as_view()),
    path('files/<int:pk>', FileDetail.as_view()),
]