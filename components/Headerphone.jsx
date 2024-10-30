"use client";
import Image from "next/image";
import Link from "next/link";
import { enableDarkMode, enableLightMode, getInitialTheme } from "../app/theme";
import useDarkMode from "./useDarkMode";
import { useEffect, useState } from "react";
import "./headerphone.css";
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
