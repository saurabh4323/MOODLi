"use client";
import Image from "next/image";
import Link from "next/link";
import { enableDarkMode, enableLightMode, getInitialTheme } from "../app/theme";
import useDarkMode from "./useDarkMode";
import { useEffect, useState } from "react";
import "./headerphone.css";
import Head from "next/head";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for hamburger
import Notification from "./Post/Notifi";
import {
  Eye,
  House,
  LayoutDashboard,
  LogIn,
  Send,
  SquareM,
  User,
} from "lucide-react";
import axios from "axios";

const Headerphone = () => {
  const [pic, setPic] = useState(""); // Initialize state for favorite emoji
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [menu, setMenu] = useState(false); // Toggle for the mobile menu
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }, []);

  useEffect(() => {
    // Fetch the user's favorite emoji
    const fetchUserEmoji = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`/api/users/new/${userId}`);
        console.log(response.data); // Log the entire response data

        // Check if user data exists and then set the favorite emoji
        if (response.data && response.data.user) {
          setPic(response.data.user.favoriteEmoji); // Set the favorite emoji
        }
      } catch (error) {
        console.error("Error fetching user emoji:", error);
      }
    };
    fetchUserEmoji();
  }, []); // Add userId as a dependency

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      setUserId(null); // Clear the user ID state
      setShowLogoutConfirmation(false); // Close the confirmation menu
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true); // Show confirmation menu
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false); // Hide confirmation menu
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };
  console.log(pic);

  return (
    <header className="header-containerkk">
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
      <div className="header-content">
        <Image
          style={{ marginTop: "20px" }}
          className="logoo"
          src="/l.png"
          alt="Logo"
          width={80}
          height={100}
        />

        {/* Desktop Navigation */}
        <nav className="nav">
          <Link href="/main" className="nav-item">
            <House color="#fff" />
          </Link>
          <Link href="/dashboard" className="nav-item">
            <LayoutDashboard color="#fff" />
          </Link>
          <Link href="/community" className="nav-item">
            <SquareM color="#fff" />
          </Link>
          <Link href="/create" className="nav-item">
            <Send color="#fff" />
          </Link>
          <Link href="/track" className="nav-item">
            <Eye color="#fff" />
          </Link>

          {isAuthenticated ? (
            <Link href="/profile" className="nav-items">
              {pic ? <span>{pic}</span> : <User color="#fff" />}
            </Link>
          ) : (
            <Link href="/register" className="nav-item">
              <LogIn color="#fff" />
            </Link>
          )}
        </nav>
      </div>

      {/* Confirmation Menu */}
      {showLogoutConfirmation && (
        <div className="confirmation-menu">
          <p style={{ color: "#fff" }}>Are you sure you want to log out?</p>
          <button
            style={{
              backgroundColor: "green",
              width: "50px",
              border: "1px solid #fff",
            }}
            onClick={handleLogout}
          >
            Yes
          </button>
          <button
            style={{
              backgroundColor: "red",
              width: "50px",
              border: "1px solid #fff",
            }}
            onClick={handleCancelLogout}
          >
            No
          </button>
        </div>
      )}
    </header>
  );
};

export default Headerphone;
