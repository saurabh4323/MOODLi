"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Chat.module.css";

const Chat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userIdMapping, setUserIdMapping] = useState({}); // Mapping of _id to userId
  const [currentUserId, setCurrentUserId] = useState(null); // Store current userId from localStorage

  // Fetch currentUserId from localStorage on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      setCurrentUserId(userId);
    }
  }, []);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch friends from the API
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `/api/feeltalk/friend?userId=${currentUserId}`
        );

        // Create mapping of _id to userId
        const mapping = {};
        response.data.friends.forEach((friend) => {
          mapping[friend._id] = friend.userId; // Assuming userId is part of the friend data
        });

        setUserIdMapping(mapping);
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (currentUserId) {
      fetchFriends();
    }
  }, [currentUserId]);

  // Fetch messages when a friend is selected or periodically (every 10 seconds)
  useEffect(() => {
    let pollingInterval;

    const fetchMessages = async () => {
      if (selectedFriend) {
        try {
          const response = await axios.get(`/api/users/message`, {
            params: {
              senderId: currentUserId,
              receiverId: userIdMapping[selectedFriend._id], // Use userId from mapping
            },
          });
          setMessages(response.data.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    if (selectedFriend) {
      fetchMessages(); // Fetch messages on friend selection

      // Start polling every 10 seconds
      pollingInterval = setInterval(fetchMessages, 10000);
    }

    // Clean up the polling interval when the component unmounts or friend changes
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [selectedFriend, currentUserId, userIdMapping]);

  // Handle sending a message
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post("/api/users/message", {
        senderId: currentUserId,
        receiverId: userIdMapping[selectedFriend._id], // Use userId from mapping
        content: newMessage,
      });
      setMessages([...messages, response.data.message]);
      setNewMessage(""); // Clear input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle key press for sending message with Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar for friend list */}
      <div className={styles.sidebar}>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <ul>
          {filteredFriends.map((friend) => (
            <li
              key={friend._id}
              onClick={() => setSelectedFriend(friend)}
              className={styles.friendItem}
            >
              <div className={styles.friendAvatar}>
                <span role="img" aria-label={friend.name}>
                  {friend.favoriteEmoji}
                </span>
              </div>
              <span className={styles.friendName}>{friend.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area */}
      <div className={styles.chatArea}>
        {selectedFriend ? (
          <>
            <div className={styles.sd}>
              <h3 className={styles.int}>Chat with {selectedFriend.name}</h3>
            </div>

            <div className={styles.messages}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.senderId === currentUserId
                      ? styles.messageSender
                      : styles.messageReceiver
                  }
                >
                  {message.content}
                </div>
              ))}
            </div>

            <div className={styles.inputArea}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={handleKeyPress}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a friend to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
