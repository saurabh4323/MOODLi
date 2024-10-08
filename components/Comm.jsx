"use client";
import React, { useEffect, useState } from "react";
import "./comm.css";

const Comm = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const colors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#F9A8D4",
    "#FDBA74",
    "#FB7185",
    "#A3E635",
    "#FACC15",
    "#86EFAC",
    "#C084FC",
    "#FECACA",
    "#FF9AA2",
    "#FFB3E6",
    "#FF6666",
    "#FFB347",
    "#D3C0FB",
    "#FFC3A0",
    "#FF677D",
    "#D4A5A5",
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users/chat");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      const usersWithBioAndEmoji = await Promise.all(
        data.map(async (user) => {
          const bioAndEmojiResponse = await fetch(`/api/users/picture`);
          if (!bioAndEmojiResponse.ok) {
            throw new Error("Failed to fetch bio and emoji");
          }
          const bioAndEmojiData = await bioAndEmojiResponse.json();
          return {
            ...user,
            bio: bioAndEmojiData.bio,
            favoriteEmoji: bioAndEmojiData.favoriteEmoji,
          };
        })
      );
      const sortedUsers = usersWithBioAndEmoji.sort((a, b) => {
        if (a.hasNewMessage && !b.hasNewMessage) return -1;
        if (!a.hasNewMessage && b.hasNewMessage) return 1;
        return 0;
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users or bio and emoji:", error);
      // Handle error as needed (e.g., show error message)
    }
  };

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="comm-main">
      <div className="topmain">
        <h1>Connect with people, make them friends</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or emoji..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="cards-container">
        {users.length === 0 ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          users
            .filter(
              (user) =>
                user.name && user.name.toLowerCase().includes(searchTerm)
            )
            .map((user) => (
              <div
                key={user._id}
                style={{ backgroundColor: getRandomColor() }}
                className="user-card"
              >
                <h2 className="user-name">{user.name}</h2>
                <p className="user-bio">{user.bio}</p>
                <span className="user-emoji">{user.favoriteEmoji}</span>
                {user.hasNewMessage && (
                  <span className="new-message-indicator">•</span>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Comm;
