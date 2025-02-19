import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChatRooms from "./components/ChatRooms";
import CreateRoom from "./components/CreateRoom";
import ChatHome from "./pages/ChatHome";
import Room from "./pages/Room";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/chat-rooms" element={<ChatRooms />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/" element={<ChatHome />} />
      </Routes>
    </Router>
  );
}

export default App;
