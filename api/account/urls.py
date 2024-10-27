# account/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('user/login/', views.login_user, name="login"),
    path('user/signup/', views.register_user, name="register"),
    path('user/register/phone/', views.register_user_phone_number, name="register-phone"),
    path('user/logout/', views.logout_user, name="logout_user"),
    path('user/verify/phone/', views.verify_code, name="verify_code"),
    path('user/change-password/', views.change_user_password, name="change_password"),
    path('user/resend/code/', views.resend_phone_code, name="resend_code"),
    path('user/info/', views.get_user_info, name="user_info"),
    path('user/start-session/', views.StartUserSessionView.as_view(), name='start-session'),
    path('user/session-heartbeat/', views.SessionHeartbeatView.as_view(), name='session-heartbeat'),
    path('user/end-session/', views.EndUserSessionView.as_view(), name='end-session'),
    path('user/refresh-token/', views.refresh_access_token, name='refresh-token'),
]
