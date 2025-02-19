from django.urls import path
from .views import signup, create_room, chat_room_list, chat_room, chat_home

urlpatterns = [
    path("api/signup/", signup, name="signup"),  
    path("api/create-room/", create_room, name="create_room"),  
    path("api/chat-rooms/", chat_room_list, name="chat_room_list"),  
    path("api/room/<int:room_id>/", chat_room, name="chat_room"),  
    path("api/home/", chat_home, name="chat_home"),  
]
