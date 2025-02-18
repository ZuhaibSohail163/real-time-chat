from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import ChatRoom, Message
from django.contrib.auth.models import User

def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")  # Redirect to login page after signup
    else:
        form = UserCreationForm()
    return render(request, "chat/signup.html", {"form": form})

def is_superuser(user):
    return user.is_superuser

@user_passes_test(is_superuser)
def create_room(request):
    if request.method == "POST":
        room_name = request.POST.get("room_name")
        if room_name:
            ChatRoom.objects.create(name=room_name, created_by=request.user)
            return redirect("chat_room_list")
    return render(request, "chat/create_room.html")

@login_required
def chat_room_list(request):
    rooms = ChatRoom.objects.all()
    return render(request, "chat/rooms.html", {"rooms": rooms})

@login_required
def chat_room(request, room_id):
    room = get_object_or_404(ChatRoom, id=room_id)  # Ensure room is fetched by ID
    messages = Message.objects.filter(room=room)
    
    if request.method == "POST":
        content = request.POST.get("message")
        if content:
            Message.objects.create(room=room, user=request.user, content=content)
            return redirect("chat_room", room_id=room.id)

    return render(request, "chat/room.html", {"room": room, "messages": messages})

def chat_home(request):
    rooms = ChatRoom.objects.all()  # Fetch all rooms
    return render(request, "chat/chat_home.html", {"rooms": rooms})