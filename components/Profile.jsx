"use client";
import React, { useState, useEffect } from "react";
import "./hero.css";
import axios from "axios";
import styles from "./styles.module.css"; // Importing the CSS module
import toast from "react-hot-toast"; // Importing toast

export default function Profile() {
  const [gender, setGender] = useState("Other"); // State to manage selected gender
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    favoriteEmoji: "",
    bio: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        fetchProfile(userId);
      }
    }
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const res = await axios.post("/api/users/sau", { userId });
      console.log("Fetched profile data:", res.data);
      setProfile(res.data);
      setGender(res.data.gender || "Other"); // Fetch gender
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        if (!profile.name || !profile.favoriteEmoji) {
          toast.error("Name and Favorite Emoji are required.");
          return;
        }

        try {
          const res = await axios.post("/api/users/sau", {
            userId,
            email: profile.email,
            name: profile.name,
            favoriteEmoji: profile.favoriteEmoji,
            bio: profile.bio,
            phoneNumber: profile.phoneNumber, // Send phone number
            gender: gender, // Send gender
          });
          console.log("Profile updated:", res.data);
          fetchProfile(userId); // Refresh profile after update
          toast.success("Profile updated successfully!"); // Use toast for success
        } catch (error) {
          console.error("Error updating profile:", error);
          toast.error("Error updating profile."); // Show error toast
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className="background1"></div>
      <div className="background2"></div>
      <div className="background3"></div>
      <div className={styles.card}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profilePicture}>
            <span style={{ fontSize: "70px", marginTop: "-10px" }}>
              {profile.favoriteEmoji || "😊"} {/* Fallback emoji */}
            </span>
          </div>
          <h2 className={styles.username}>Profile</h2>
        </div>

        {/* Profile Info */}
        <form className={styles.profileInfo} onSubmit={handleUpdateProfile}>
          <div className={styles.infoItem}>
            <label>Name:</label>
            <input
              placeholder="Write Your Name"
              type="text"
              className={styles.profileInput}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.infoItem}>
            <label>Favorite Emoji:</label>
            <input
              placeholder="use WIN+. for emoji"
              type="text"
              className={styles.profileInput}
              value={profile.favoriteEmoji}
              onChange={(e) =>
                setProfile({ ...profile, favoriteEmoji: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.infoItem}>
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={styles.genderSelect}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.infoItem}>
            <label>Phone Number:</label>
            <input
              placeholder="Enter Your Number"
              type="text"
              className={styles.profileInput}
              value={profile.phoneNumber}
              onChange={(e) =>
                setProfile({ ...profile, phoneNumber: e.target.value })
              }
            />
          </div>

          <div className={styles.infoItem}>
            <label>Bio:</label>
            <textarea
              placeholder="Describe yourself"
              className={styles.profileTextarea}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>

          <button className="button" type="submit">
            Update Profile
          </button>
        </form>

        <div className={styles.socialSection}>
          <h3
            style={{
              color: "#637696",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Social
          </h3>
          <div className={styles.socialButtons}>
            <button className="button">Friends</button>
            <button className="button">Invite Friends</button>
          </div>
        </div>

        {/* Account Section */}
        <div className={styles.accountSection}>
          <h3
            style={{
              color: "#637696",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Account
          </h3>
          <div className={styles.accountButtons}>
            <button className="button">Edit Profile</button>
            <button className="button">Change Password</button>
            <button
              className={`${styles.accountButton} ${styles.deleteButton}`}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
