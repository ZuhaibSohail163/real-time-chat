import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateRoom.css"; // Import CSS

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) {
      alert("Room name cannot be empty!");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/create-room/", { room_name: roomName }, { withCredentials: true });
      navigate("/chat-rooms"); // Redirect to rooms list after creation
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room!");
    }
  };

  return (
    <div className="create-room-container">
      <h2>Create a New Chat Room</h2>
      <form onSubmit={handleCreateRoom}>
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      <p>
        <a href="/chat-rooms">Back to Chat Rooms</a>
      </p>
    </div>
  );
};

export default CreateRoom;
