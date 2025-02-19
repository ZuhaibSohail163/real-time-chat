import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Room.css"; // Import CSS

const Room = () => {
  const { roomName } = useParams(); // Get room name from URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Fetch previous messages
    axios
      .get(`http://127.0.0.1:8000/api/chat-room/${roomName}/messages/`)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));

    // WebSocket connection
    const websocket = new WebSocket(`ws://${window.location.host}/ws/chat/${roomName}/`);
    setWs(websocket);

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => websocket.close(); // Cleanup on component unmount
  }, [roomName]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && ws) {
      ws.send(JSON.stringify({ message }));
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="chat-room-container">
      <h2>Room: {roomName}</h2>
      <Link to="/chat-rooms" className="back-link">Back to Rooms</Link>

      <div className="messages-box">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <p key={index} className="message">
              <strong>{msg.user}</strong>: {msg.content}
            </p>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Room;
