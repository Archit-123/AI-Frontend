import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:5000", { autoConnect: false });

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on("receiveMessage", (newMessage) => {
      console.log("Altered  Receieve Message");

      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", message);
      console.log("Message sent!!");

      setMessage("");
    }
  };
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === "Bot" ? "bot" : "user"}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
