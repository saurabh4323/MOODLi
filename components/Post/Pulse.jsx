"use client";
import React, { useState, useEffect } from "react";
import Users from "../Afterchat/Users";
import Pulseright from "./Pulseright";
import { Menu } from "lucide-react";
import "./style.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Head from "next/head";
export default function Pulse() {
  const rouuter = useRouter();
  useEffect(() => {
    const checkAuthentication = async () => {
      const userId = localStorage.getItem("userId");
      const storedEmail = localStorage.getItem("email");

      if (!userId || !storedEmail) {
        alert("Please log in to access your profile.");
        rouuter.push("/login");
        return;
      }

      try {
        const response = await axios.post("/api/users/sau", { userId });
        if (response.data.email !== storedEmail) {
          alert("Don't try this again");
          localStorage.removeItem("userId");
          localStorage.removeItem("email");
          rouuter.push("/login");
        } else {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error verifying user email:", error);
        // alert("Authentication error. Redirecting to login.");
        // rouuter.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);
  // State to manage the hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="pulse" style={{ minHeight: "100vh", maxHeight: "102vh" }}>
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
      <div className="showpulse" style={{ display: "flex" }}>
        <div
          className="pleft"
          style={{
            border: "1px solid rgba(124, 130, 195, 0.5)",
            borderRadius: "20px",
            maxHeight: "102vh",
            overflowY: "auto",
          }}
        >
          <Users />
        </div>

        {/* Conditionally show Pulseright based on menu state */}
        <div
          className="pright"
          style={{ minHeight: "100vh", maxHeight: "102vh" }}
        >
          <Pulseright />
        </div>
      </div>
    </div>
  );
}
