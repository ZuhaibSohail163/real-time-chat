from django.db import models
from django.contrib.auth.models import User

class ChatRoom(models.Model):
    id = models.AutoField(primary_key=True)  # Explicit ID field
    name = models.CharField(max_length=255, unique=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Message(models.Model):
    id = models.AutoField(primary_key=True)  # Explicit ID field
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.content[:20]}"
