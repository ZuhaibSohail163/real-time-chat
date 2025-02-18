from django.urls import path
from django.contrib.auth import views as auth_views
from .views import chat_home, chat_room_list, chat_room, signup, create_room

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name="chat/login.html"), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),  # Fix here
    path('', chat_room_list, name='chat_room_list'),
    path('create_room/', create_room, name='create_room'),  # Superuser creates a room
    path("", chat_home, name="chat_home"),  # This maps /chat/ to chat_home
    path("<int:room_id>/", chat_room, name="chat_room"),  # Now only room_id is used

]
