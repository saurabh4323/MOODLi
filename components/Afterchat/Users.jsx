"use client";
import React, { useEffect, useState } from "react";
import "../comm.css";
import axios from "axios";
import "../profile.css";
import { useRouter } from "next/navigation";
import { Flame, Flower, Locate } from "lucide-react";
import Location from "./Location";
import Head from "next/head";

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
  ];

  const rou = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchUsers();
      fetchFriends();

      const handleResize = () => {
        // Window resize logic if needed
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
    bio.length > 25 ? ` ${bio.substring(0, 25)}... ` : bio;

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
    rou.push("/chat");
  };

  const sendto = (user) => {
    setSelectedUser(user);
    rou.push(`/viewing/${user.userId}`);
  };

  const toggleFriendList = () => {
    setShowFriendList((prev) => !prev);
    if (!showFriendList) fetchFriends();
  };
  const [locapage, setlocapage] = useState(false);
  const showlocapage = () => {
    setlocapage(true);
  };
  return (
    <div className="comm-main">
      <Head>
        <title>Moodli - Your Anonymous Mood Tracking and Chat Platform</title>
        <meta
          name="description"
          content="Join Moodli to track your mood, connect with friends, and share feelings. Experience a supportive community and powerful insights tailored for you."
        />
        <meta
          name="keywords"
          content="Anonymous chat app, mood tracking, mood sharing platform, location-based connections, make friends online, daily mood updates, emotional support community, connect with locals, mood tracking features, self-discovery network, mental wellness chat, share your feelings, find like-minded friends, mood reflection posts, safe space for emotions, anonymous support groups, mood logging tool, emotional intelligence app, discover nearby users, friendship building app, interactive mood journal, personal growth community, well-being chat features, peer support network, share your thoughts anonymously, digital mood diary, chat and connect with others, mood journaling and posting, build friendships online, peer support network for moods, interactive mood diary app, chat anonymously about feelings, create and share mood posts, emotional wellness and friendships, join a mood-focused community, daily mood updates and connections, friend-making and mood sharing, digital platform for mood and chat"
        />
      </Head>
      <div className="topmain">
        <h1>Connect with people</h1>
        <button
          onClick={showlocapage}
          style={{ backgroundColor: "#4526b1" }}
          className="show-friend-list-btn"
        >
          Location
        </button>
      </div>

      <div className="search-bar">
        <input
          style={{ height: "50px", color: "#000" }}
          type="text"
          onClick={() => rou.push("/search")}
          placeholder="Search by name or emoji..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {locapage && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Location onNearbyUsersFetched={fetchUsers} />
        </div>
      )}

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
                style={{ backgroundColor: getRandomColor() }}
                className="user-card"
              >
                <h2
                  style={{ cursor: "pointer", position: "relative" }}
                  className="user-name"
                  onClick={() => sendto(user)}
                >
                  {user.name}
                </h2>
                <span
                  className="user-emoji"
                  onClick={() => handleAddFriendClick(user)}
                >
                  {user.favoriteEmoji}
                </span>
                <p
                  className="user-bio"
                  onClick={() => handleAddFriendClick(user)}
                >
                  {truncateBio(user.bio)}
                </p>
                <p
                  onClick={() => sendto(user)}
                  className="user-biom"
                  style={{ marginBottom: "-15px" }}
                >
                  {user.gender === "Male" ? (
                    <Flame size={20} color="#fff705" strokeWidth={3} />
                  ) : (
                    <Flower color="aliceblue" />
                  )}
                </p>
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
