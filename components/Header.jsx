"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [menu, setMenu] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // New state for logout confirmation

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
