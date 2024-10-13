"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Chat.module.css";

const Chat = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userIdMapping, setUserIdMapping] = useState({}); // Mapping of _id to userId

  const currentUserId = localStorage.getItem("userId"); // Get current userId from localStorage
  console.log("Current User ID:", currentUserId); // Debugging line

  // Fetch friends from the API
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `/api/feeltalk/friend?userId=${currentUserId}`
        );
        console.log("Fetched Friends:", response.data.friends); // Debugging line

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

  // Fetch messages when a friend is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedFriend) {
        try {
          const response = await axios.get(`/api/users/message`, {
            params: {
              senderId: currentUserId,
              receiverId: userIdMapping[selectedFriend._id], // Use userId from mapping
            },
          });
          console.log(
            "Fetched Messages for",
            selectedFriend.name,
            ":",
            response.data.messages
          ); // Debugging line
          setMessages(response.data.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
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
      console.log("Message Sent:", response.data.message); // Debugging line
      setMessages([...messages, response.data.message]);
      setNewMessage(""); // Clear input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar for friend list */}
      <div className={styles.sidebar}>
        <h3>Friends</h3>
        <ul>
          {friends.map((friend) => (
            <li
              key={friend._id}
              onClick={() => {
                console.log("Selected Friend:", friend); // Debugging line
                setSelectedFriend(friend);
              }}
              className={
                selectedFriend?._id === friend._id ? styles.active : ""
              }
            >
              {friend.name} ({friend.favoriteEmoji})
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area */}
      <div className={styles.chatArea}>
        {selectedFriend ? (
          <>
            <h3>Chat with {selectedFriend.name}</h3>
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
