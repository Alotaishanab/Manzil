from django.urls import path
from . import views

urlpatterns = [
    path('user/login', views.login_user, name="login"),
    path('user/signup', views.register_user, name="register"),
    path('user/register/phone', views.register_user_phone_number),
    path('user/logout', views.logout_user, name="logout_user"),
    path('user/verify/phone', views.verify_code, name="verify_code"),
    path('user/change-password', views.change_user_password),
    path('user/resend/code', views.resend_phone_code),
]
