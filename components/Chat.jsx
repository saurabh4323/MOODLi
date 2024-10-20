"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Chat.module.css";
import Image from "next/image";

const Chat = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userIdMapping, setUserIdMapping] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      setCurrentUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `/api/feeltalk/friend?userId=${currentUserId}`
        );

        const friendsWithTimestamp = response.data.friends.map((friend) => ({
          ...friend,
          lastMessageTime: friend.lastMessageTime || 0,
        }));

        friendsWithTimestamp.sort(
          (a, b) => b.lastMessageTime - a.lastMessageTime
        );

        const mapping = {};
        friendsWithTimestamp.forEach((friend) => {
          mapping[friend._id] = friend.userId;
        });

        setUserIdMapping(mapping);
        setFriends(friendsWithTimestamp);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (currentUserId) {
      fetchFriends();
    }
  }, [currentUserId]);

  useEffect(() => {
    let pollingInterval;

    const fetchMessages = async () => {
      if (selectedFriend) {
        try {
          const response = await axios.get(`/api/users/message`, {
            params: {
              senderId: currentUserId,
              receiverId: userIdMapping[selectedFriend._id],
            },
          });

          const messagesWithTimestamp = response.data.messages.map(
            (message) => {
              const formattedTimestamp = message.timestamp
                ? new Date(message.timestamp).toLocaleTimeString()
                : "";

              return {
                ...message,
                timestamp: formattedTimestamp,
              };
            }
          );

          setMessages(messagesWithTimestamp);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    if (selectedFriend) {
      fetchMessages();
      pollingInterval = setInterval(fetchMessages, 10000);
    }

    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [selectedFriend, currentUserId, userIdMapping]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post("/api/users/message", {
        senderId: currentUserId,
        receiverId: userIdMapping[selectedFriend._id],
        content: newMessage,
      });

      const messageWithTimestamp = {
        ...response.data.message,
        timestamp: response.data.message.timestamp
          ? new Date(response.data.message.timestamp).toLocaleTimeString()
          : new Date().toLocaleTimeString(),
      };

      setMessages([...messages, messageWithTimestamp]);
      setNewMessage("");

      setFriends((prevFriends) =>
        prevFriends.map((friend) =>
          friend._id === selectedFriend._id
            ? { ...friend, lastMessageTime: Date.now() }
            : friend
        )
      );

      setFriends((prevFriends) =>
        [...prevFriends].sort((a, b) => b.lastMessageTime - a.lastMessageTime)
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setIsSidebarVisible(false); // Hide sidebar when a friend is selected
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className={styles.chatContainer}>
      <div
        className={`${styles.sidebar} ${isSidebarVisible ? styles.show : ""}`}
      >
        <div className={styles.firstslide}>
          <Image
            style={{ marginTop: "20px" }}
            src="https://img.icons8.com/?size=100&id=38977&format=png&color=0a80ff"
            width={45}
            height={40}
            alt="Icon Description"
          />
          <Image
            src="https://img.icons8.com/?size=100&id=85411&format=png&color=ffffff"
            width={30}
            height={40}
            alt="Icon Description"
          />
          <Image
            src="https://img.icons8.com/?size=100&id=qDNClnB7Z4Ky&format=png&color=ffffff"
            width={25}
            height={40}
            alt="Icon Description"
          />
          <Image
            src="https://img.icons8.com/?size=100&id=13725&format=png&color=000000"
            width={40}
            height={40}
            alt="Icon Description"
          />
        </div>
        <div className={styles.secondslide}>
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
                onClick={() => handleFriendSelect(friend)}
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
      </div>

      <div
        className={`${styles.chatArea} ${isSidebarVisible ? "" : styles.show}`}
      >
        <div className={styles.chatHeader}>
          <span className={styles.intro}>
            {selectedFriend?.name} {selectedFriend.favoriteEmoji}
          </span>
          <div className={styles.icons}>{/* Call and video icons */}</div>
        </div>

        {selectedFriend ? (
          <>
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
                  <div className={styles.messageContent}>
                    {message.content}
                    <span className={styles.timestamp}>
                      {message.timestamp}
                    </span>
                  </div>
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
          <p>Please select a friend to start chatting!</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
