// components/Chat.js
"use client"; // This line indicates that this component is client-side

import { useEffect, useState } from "react";
import styles from "./Chat.module.css"; // Import styles from a CSS module

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null); // State to hold userId

  useEffect(() => {
    // Get userId from localStorage on the client side
    const id = localStorage.getItem("userId");
    setUserId(id);
    fetchUsers(); // Fetch users on component mount
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(); // Fetch messages when a user is selected
      const interval = setInterval(fetchMessages, 2000); // Poll for new messages every 2 seconds
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [selectedUser]);

  const fetchMessages = async () => {
    if (!selectedUser || !userId) return; // No user selected or no userId
    const response = await fetch(
      `/api/users/message?senderId=${userId}&receiverId=${selectedUser._id}`
    );
    if (!response.ok) {
      console.error("Failed to fetch messages:", response.statusText);
      return;
    }
    const data = await response.json();
    setMessages(data);
  };

  const fetchUsers = async () => {
    const response = await fetch("/api/users/chat");
    if (!response.ok) {
      console.error("Failed to fetch users:", response.statusText);
      return;
    }
    const data = await response.json();
    setUsers(data);
  };

  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      await fetch("/api/users/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: userId,
          receiverId: selectedUser._id,
          message: newMessage,
        }),
      });
      setNewMessage(""); // Clear input field after sending
      fetchMessages(); // Refresh messages after sending
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.userList}>
        <h3>Users</h3>
        {users.length === 0 ? (
          <div>No users available.</div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className={styles.user}
              onClick={() => setSelectedUser(user)}
            >
              <span>
                {user.favoriteEmoji} {user.name}
              </span>
            </div>
          ))
        )}
      </div>
      <div className={styles.chatArea}>
        {selectedUser ? (
          <>
            <div className={styles.messages}>
              {messages.map((msg) => (
                <div key={msg._id} className={styles.message}>
                  <span>
                    {msg.senderId === userId
                      ? users.find((u) => u._id === userId)?.favoriteEmoji
                      : users.find((u) => u._id === selectedUser._id)
                          ?.favoriteEmoji}{" "}
                    {msg.senderId === userId
                      ? users.find((u) => u._id === userId)?.name
                      : users.find((u) => u._id === selectedUser._id)?.name}
                    : {msg.message}
                  </span>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className={styles.input}
            />
            <button onClick={sendMessage} className={styles.sendButton}>
              Send
            </button>
          </>
        ) : (
          <div>Please select a user to start chatting.</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
