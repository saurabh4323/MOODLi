"use client";
import React, { useEffect, useState } from "react";
import "../comm.css";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [friendList, setFriendList] = useState([]); // To store the friend's list
  const [showFriendList, setShowFriendList] = useState(false); // State to toggle friend list visibility

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
      const response = await axios.get("api/users/picture");
      console.log(response.data);
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

  const truncateBio = (bio) => {
    return bio.length > 25 ? bio.substring(0, 25) + "..." : bio;
  };

  const handleAddFriendClick = (user) => {
    setSelectedUser(user);
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    setSelectedUser(null);
  };

  const handleConfirmAddFriend = async () => {
    const userId = localStorage.getItem("userId"); // Get logged-in user's ID
    const friendId = selectedUser._id; // ID of the selected user

    try {
      await axios.post("/api/users/friend", { userId, friendId });
      alert(`${selectedUser.name} has been added as a friend!`);
      handleCloseMenu(); // Close the menu after adding
      fetchFriends(); // Optional: Refresh the friend list if needed
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const fetchFriends = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(`/api/users/friend?userId=${userId}`);
      setFriendList(response.data ? response.data.friends : []); // Set friends list
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const toggleFriendList = () => {
    setShowFriendList((prev) => !prev); // Toggle visibility of friend list
    if (!showFriendList) fetchFriends(); // Fetch friends only if we're opening the list
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

      <button className="show-friend-list-btn" onClick={toggleFriendList}>
        {showFriendList ? "Hide Friend List" : "Show Friend List"}
      </button>

      {showFriendList && (
        <div className="friend-list-container">
          <h2>Your Friends:</h2>
          {friendList.length === 0 ? (
            <p>No friends added yet.</p>
          ) : (
            <ul>
              {friendList.map((friendId) => {
                const friend = users.find((user) => user._id === friendId);
                return friend ? (
                  <li key={friendId}>
                    {friend.name} <span>{friend.favoriteEmoji}</span>
                  </li>
                ) : null;
              })}
            </ul>
          )}
        </div>
      )}

      <div className="cards-container">
        {users.length === 0 ? (
          <p>Loading...</p>
        ) : (
          users
            .filter(
              (user) =>
                user.name && user.name.toLowerCase().includes(searchTerm)
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
