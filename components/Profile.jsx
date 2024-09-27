"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import "./Dashboard.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    favoriteEmoji: "",
    bio: "",
  });

  useEffect(() => {
    // Check if the code is running in the browser
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
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Ensure we're in the browser environment to access localStorage
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        // Log the data being sent for debugging
        console.log("Updating profile with data:", {
          userId,
          name: profile.name,
          favoriteEmoji: profile.favoriteEmoji,
          bio: profile.bio,
        });

        // Ensure name and emoji are not empty before updating
        if (!profile.name || !profile.favoriteEmoji) {
          alert("Name and Favorite Emoji are required.");
          return;
        }

        try {
          const res = await axios.post("/api/users/sau", {
            userId,
            name: profile.name,
            favoriteEmoji: profile.favoriteEmoji,
            bio: profile.bio,
          });
          console.log("Profile updated:", res.data);

          // Fetch the updated profile
          fetchProfile(userId);
          alert("Profile updated successfully!");
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="background-shapes"></div>
      <div className="background-shape"></div>
      <div className="background-shap"></div>
      <h1 className="profile-header">Your Profile</h1>
      <form className="profile-form" onSubmit={handleUpdateProfile}>
        <div className="profile-row">
          <label className="profile-label">Name:</label>
          <input
            className="profile-input"
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            autoComplete="name"
            required
          />
        </div>

        <div className="profile-row">
          <label className="profile-label">Email:</label>
          <input
            className="profile-input"
            type="email"
            value={profile.email}
            // readOnly
            autoComplete="email"
          />
        </div>

        <div className="profile-row">
          <label className="profile-label">Favorite Emoji:</label>
          <input
            className="profile-input"
            type="text"
            value={profile.favoriteEmoji}
            onChange={(e) =>
              setProfile({ ...profile, favoriteEmoji: e.target.value })
            }
            autoComplete="off"
            required
          />
        </div>

        <div className="profile-row">
          <label className="profile-label">Bio:</label>
          <textarea
            className="profile-textarea"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            autoComplete="off"
          />
        </div>

        <button className="profile-button" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}
