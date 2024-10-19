"use client";
import React, { useEffect, useState } from "react";
import "../comm.css";
import axios from "axios";
import "../profile.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [showFriendList, setShowFriendList] = useState(false);

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
    if (typeof window !== "undefined") {
      fetchUsers();
      fetchFriends();

      const handleResize = () => {
        // console.log("Window width:", window.innerWidth);
      };
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("api/users/sau");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const truncateBio = (bio) =>
    bio.length > 25 ? `${bio.substring(0, 25)}...` : bio;

  const handleAddFriendClick = (user) => {
    setSelectedUser(user);
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    setSelectedUser(null);
  };

  const handleConfirmAddFriend = async () => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("userId");
      const friendId = selectedUser.userId;

      try {
        await axios.post("/api/users/friend", { userId, friendId });
        alert(`${selectedUser.name} has been added as a friend!`);
        handleCloseMenu();
        fetchFriends();
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    }
  };

  const fetchFriends = async () => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("userId");

      try {
        const response = await axios.get(
          `/api/feeltalk/friend?userId=${userId}`
        );

        const friends = Array.isArray(response.data?.friends)
          ? response.data.friends
          : [];

        setFriendList(friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setFriendList([]);
      }
    }
  };

  const chat = () => {
    window.location.href = "/chat";
  };

  const toggleFriendList = () => {
    setShowFriendList((prev) => !prev);
    if (!showFriendList) fetchFriends();
  };

  return (
    <div className="comm-main">
      <div className="topmain">
        <h1>Connect with people, make them friends</h1>
        <button
          onClick={chat}
          style={{ backgroundColor: "green" }}
          className="show-friend-list-btn"
        >
          Chat{" "}
        </button>
      </div>

      <div className="search-bar">
        <input
          style={{ height: "50px" }}
          type="text"
          placeholder="Search by name or emoji..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="show-friend-list-btn" onClick={toggleFriendList}>
          {showFriendList ? "Hide Friend " : "Friends "}
        </button>
      </div>

      {showFriendList && (
        <div className="modal-overlays">
          <div className="modal-contents">
            <h2 className="modal-titles" style={{ color: "#000" }}>
              Friend List
            </h2>
            {friendList.length > 0 ? (
              <ul className="friend-lists">
                {friendList.map((friend, index) => (
                  <li key={index} className="friend-items">
                    <span className="friend-names">
                      {friend.name || "Anonymous"}
                    </span>
                    <span className="friend-emojis">
                      {friend.favoriteEmoji || "N/A"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No friends found.</p>
            )}
            <button
              className="modal-close-button"
              onClick={() => setShowFriendList(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="cards-container">
        {users.length === 0 ? (
          <p>Loading...</p>
        ) : (
          users
            .filter(
              (user) =>
                (user.name && user.name.toLowerCase().includes(searchTerm)) ||
                (user.favoriteEmoji &&
                  user.favoriteEmoji.toLowerCase().includes(searchTerm))
            )
            .map((user) => (
              <div
                key={user._id}
                onClick={() => handleAddFriendClick(user)}
                style={{ backgroundColor: getRandomColor() }}
                className="user-card"
              >
                <h2 className="user-name">{user.name}</h2>
                <span className="user-emoji">{user.favoriteEmoji}</span>
                <p className="user-bio">{truncateBio(user.bio)}</p>
                {user.hasNewMessage && (
                  <span className="new-message-indicator">•</span>
                )}
              </div>
            ))
        )}
      </div>

      {openMenu && (
        <div className="friend-menu-overlay">
          <div className="friend-menu">
            <button className="close-btn" onClick={handleCloseMenu}>
              ✖
            </button>
            <h5>Add {selectedUser?.name} as your friend?</h5>
            <button
              className="confirm-add-btn"
              onClick={handleConfirmAddFriend}
            >
              Add
            </button>
            <button className="cancel-btn" onClick={handleCloseMenu}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
