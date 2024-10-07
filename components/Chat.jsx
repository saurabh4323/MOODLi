"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Chat.module.css"; // Import styles from a CSS module

const Chat = () => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input

  const messagesContainerRef = useRef(null); // Reference to messages container

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
    fetchUsers(); // Fetch users on component mount
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 2000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [messages]);

  const fetchMessages = async () => {
    if (!selectedUser || !userId) return;
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
    // Sort users so that users with new messages are at the top
    const sortedUsers = data.sort((a, b) => {
      if (a.hasNewMessage && !b.hasNewMessage) return -1;
      if (!a.hasNewMessage && b.hasNewMessage) return 1;
      return 0;
    });
    setUsers(sortedUsers);
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
      setNewMessage("");
      fetchMessages(); // Fetch messages after sending
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
   
  ];

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to the bottom
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar for users */}
      <div className={styles.sidebar}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.userList}>
          {filteredUsers.length === 0 ? (
            <div>No users available.</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                style={{ backgroundColor: getRandomColor() }}
                className={`${styles.userCard} ${
                  user._id === selectedUser?._id ? styles.activeUser : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className={styles.userName}>
                  {user.name}
                  {user.hasNewMessage && (
                    <span className={styles.newMessageIndicator}>•</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat area */}
      <div ref={messagesContainerRef} className={styles.chatBox}>
        {selectedUser ? (
          <>
            <div className={styles.chatHeader}>
              <div className={styles.chatDetails}>
                <h3>{selectedUser.name}</h3>
                <span>{messages.length} Messages</span>
              </div>
            </div>
            <div className={styles.messages}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`${styles.message} ${
                    msg.senderId === userId ? styles.sent : styles.received
                  }`}
                >
                  <span className={styles.messageText}>{msg.message}</span>
                </div>
              ))}
              {/* Dummy div to scroll to the last message */}
              <div ref={messagesEndRef}></div>
            </div>
            <div className={styles.messageInputBox}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className={styles.input}
              />
              <button onClick={sendMessage} className={styles.sendButton}>
                &#9658;
              </button>
            </div>
          </>
        ) : (
          <div className={styles.selectUserMessage}>Select a user to chat</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
