"use client";
import Image from "next/image";
import Link from "next/link";
import { enableDarkMode, enableLightMode, getInitialTheme } from "../app/theme";

import useDarkMode from "./useDarkMode";
import { useEffect, useState } from "react";
import "./Header.css";
import Dark from "@/app/Dark";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [menu, setMenu] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // New state for logout confirmation
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

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }, []);

  const handleToggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      enableDarkMode();
    } else {
      setTheme("light");
      enableLightMode();
    }
    toggleDarkMode();
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      console.log("Auth Status:", authStatus);
      setIsAuthenticated(authStatus);

      const storedUserId = localStorage.getItem("userId");
      console.log("User IDd:", storedUserId);
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

  const track = () => {
    window.location.href = "/track";
  };

  const toggleMenu = () => {
    setMenu(true);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true); // Show confirmation menu
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false); // Hide confirmation menu
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <Image
          className="logoo"
          src="/l.png"
          alt="Logo"
          width={80}
          height={100}
        />

        <nav className="nav">
          <Link href="/main" className="nav-item">
            Home
          </Link>
          <Link href="/dashboard" className="nav-item">
            Dashboard
          </Link>
          <Link href="/track" className="nav-item" onClick={track}>
            VibeTrack
          </Link>
          <Link href="/community" className="nav-item">
            FeelTalks
          </Link>
          <Link href="/create" className="nav-item">
            MoodMojis
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/profile" className="nav-item">
                Profile
              </Link>
              <button onClick={handleLogoutClick} className="nav-item">
                Logout
              </button>
            </>
          ) : (
            <Link href="/register" className="nav-item">
              Login
            </Link>
          )}
        </nav>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleToggleTheme}
            style={{
              marginBottom: "10px",
              marginLeft: "20px",
              // padding: "10px 20px",

              color: theme === "dark" ? "#000" : "#fff",
              border: "none",
              borderRadius: "5px",
              height: "40px",
              marginLeft: "85%",
              cursor: "pointer",
            }}
            className="toggle-button"
          >
            <Image
              alt="Theme Toggle Icon"
              width={25}
              height={30}
              src={"/lm.png"}
              style={{ position: "absolute" }}
              className="transition-transform duration-500 hover:scale-75 hover:rotate-12 hover:opacity-80"
            />
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
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

export default Header;
