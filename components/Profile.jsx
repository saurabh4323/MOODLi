"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Importing toast
import Link from "next/link";
import "./profile.css"; // Importing the CSS file
import { Handshake, SunMoon } from "lucide-react";
import { Share2, Headset, Lock, LogOut } from "lucide-react";
export default function Profile() {
  const [gender, setGender] = useState("Other"); // State to manage selected gender
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    favoriteEmoji: "",
    bio: "",
    phoneNumber: "",
  });

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      "Hey! Check out this awesome mood-tracking website: Moodli! 😄\n" +
        "Track your mood, join the community, and chat with me! 💬\n" +
        "Use my referral code: moodli@130 to get started.\n" +
        " https://moodlie.site"
    );
    const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

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
      setProfile(res.data);
      setGender(res.data.gender || "Other"); // Fetch gender
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
          await axios.post("/api/users/sau", {
            userId,
            email: profile.email,
            name: profile.name,
            favoriteEmoji: profile.favoriteEmoji,
            bio: profile.bio,
            phoneNumber: profile.phoneNumber,
            gender: gender,
          });
          fetchProfile(userId); // Refresh profile after update
          toast.success("Profile updated successfully!");
        } catch (error) {
          console.error("Error updating profile:", error);
          toast.error("Error updating profile.");
        }
      }
    }
  };
  const handleclick = () => {
    window.location.href = "/changepassword";
  };
  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="profilePicture">
          <span className="emoji">{profile.favoriteEmoji || "😊"}</span>
        </div>
        <p className="pname">Welcome! {profile.name}</p>
        <button className="buttonk">
          <Handshake /> Friends
        </button>
        <button className="buttonk" onClick={shareOnWhatsApp}>
          <Share2 color="#ffffff" />
          Invite Friends
        </button>
        <button className="buttonk" onClick={handleclick}>
          <SunMoon color="#ffffff" /> Theme
        </button>

        <button className="buttonk">
          {" "}
          <Headset color="#ffffff" />
          Contact us
        </button>
        {/* <Link href={"/changepassword"}> */}
        <button className="buttonk" onClick={handleclick}>
          <Lock color="#ffffff" /> Change Password
        </button>

        {/* </Link> */}
        <button className="buttonk">
          {" "}
          <LogOut color="#ffffff" />
          Delete Account
        </button>
      </div>

      <div className="main-content">
        {/* Profile Header */}

        {/* Profile Info */}
        <form className="profileInfo" onSubmit={handleUpdateProfile}>
          <div className="infoItem">
            <label>Name:</label>
            <input
              placeholder="Write Your Name"
              type="text"
              className="profileInput"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>

          <div className="infoItem">
            <label>Favorite Emoji:</label>
            <input
              placeholder="use WIN+. for emoji"
              type="text"
              className="profileInput"
              value={profile.favoriteEmoji}
              onChange={(e) =>
                setProfile({ ...profile, favoriteEmoji: e.target.value })
              }
              required
            />
          </div>

          <div className="infoItem">
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="genderSelect"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="infoItem">
            <label>Phone Number:</label>
            <input
              placeholder="Enter Your Number"
              type="text"
              className="profileInput"
              value={profile.phoneNumber}
              onChange={(e) =>
                setProfile({ ...profile, phoneNumber: e.target.value })
              }
            />
          </div>

          <div className="infoItem">
            <label>Bio:</label>
            <textarea
              placeholder="Describe yourself"
              className="profileTextarea"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>

          <button className="button" type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
