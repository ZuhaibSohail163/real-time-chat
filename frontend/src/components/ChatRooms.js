import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ChatRooms.css"; // Import CSS

const ChatRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // Fetch chat rooms from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/rooms/")
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout/", {}, { withCredentials: true });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="chatrooms-container">
      <h1>Chat Rooms</h1>
      <div className="top-bar">
        <p>Welcome, User!</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <button className="create-room-btn" onClick={() => navigate("/create-room")}>
          Create Room
        </button>
      </div>

      <div className="rooms-list">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="room">
              <a href={`/room/${room.id}`} className="room-link">{room.name}</a>
            </div>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default ChatRooms;
