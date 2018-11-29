from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.conf import settings
from allauth.account.views import confirm_email as allauthemailconfirmation
from allauth.account.views import password_reset
from .views import (
    UserList, UserDetail, FileList, FileDetail,
    success_email_confirm, PermissionView, redirect_front_login, redirect_front_register,
    null_view
)

urlpatterns = [
    re_path(r'^auth/registration/account-confirm-email/(?P<key>.+)/$',
            allauthemailconfirmation, name="account_confirm_email"),
    re_path(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            password_reset, name='password_reset_confirm'),
    path('accounts/login/', redirect_front_login, name='account_login'),
    path('signup/', redirect_front_register, name='account_signup'),
    path('logout/', null_view, name='account_logout'),
    path('change/', null_view, name='account_email'),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/account-email-verification-sent/', success_email_confirm,
         name='account_email_verification_sent'),
    path('users/', UserList.as_view()),
    path('users/detail/', UserDetail.as_view()),
    path('file/', FileList.as_view()),
    path('file/<int:pk>', FileDetail.as_view()),
    path('permissions/', PermissionView.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
