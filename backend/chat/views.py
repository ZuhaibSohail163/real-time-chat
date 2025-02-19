from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import JsonResponse
from .models import ChatRoom, Message
from django.contrib.auth.models import User

def signup(request):
    """ API endpoint for user signup """
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({"message": "User created successfully"}, status=201)
        return JsonResponse({"errors": form.errors}, status=400)

    return JsonResponse({"error": "GET method not allowed"}, status=405)


def is_superuser(user):
    return user.is_superuser

@user_passes_test(is_superuser)
def create_room(request):
    """ API endpoint to create a chat room (Superuser only) """
    if request.method == "POST":
        room_name = request.POST.get("room_name")
        if room_name:
            room = ChatRoom.objects.create(name=room_name, created_by=request.user)
            return JsonResponse({"message": "Room created", "room_id": room.id}, status=201)
        return JsonResponse({"error": "Room name is required"}, status=400)

    return JsonResponse({"error": "GET method not allowed"}, status=405)


@login_required
def chat_room_list(request):
    rooms = ChatRoom.objects.all().values("id", "name", "created_by_id")  # ✅ Remove 'created_at'
    return JsonResponse(list(rooms), safe=False)


@login_required
def chat_room(request, room_id):
    """ API endpoint to fetch a single chat room and its messages """
    room = get_object_or_404(ChatRoom, id=room_id)
    messages = Message.objects.filter(room=room).values("user__username", "content", "timestamp")

    if request.method == "POST":
        content = request.POST.get("message")
        if content:
            message = Message.objects.create(room=room, user=request.user, content=content)
            return JsonResponse({"message": "Message sent", "id": message.id}, status=201)

    return JsonResponse({"room": {"id": room.id, "name": room.name}, "messages": list(messages)}, status=200)


def chat_home(request):
    """ API endpoint to fetch all rooms for homepage """
    rooms = ChatRoom.objects.all().values("id", "name")
    return JsonResponse({"rooms": list(rooms)}, status=200)
