import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatHome = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/chat/chat-rooms/", { withCredentials: true }) // ✅ Fix API route
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  return (
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li key={room.id}>
              <a href={`/chat/room/${room.id}`}>{room.name}</a>
            </li>
          ))
        ) : (
          <li>No rooms available.</li>
        )}
      </ul>
    </div>
  );
};

export default ChatHome;
