"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Ensure that localStorage is only accessed in the client-side environment
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      console.log("Auth Status:", authStatus);
      setIsAuthenticated(authStatus);

      const storedUserId = localStorage.getItem("userId");
      console.log("User ID:", storedUserId);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    // Ensure localStorage operations are performed client-side
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      setUserId(null); // Clear the user ID state
    }
  };
  const track = () => {
    window.location.href("/track");
  };
  console.log("Rendering Header, isAuthenticated:", isAuthenticated);
  return (
    <header className="header-container">
      <div className="header-content">
        <Image
          className="logo"
          src="/logo.svg"
          alt="Logo"
          width={500}
          height={500}
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
              <button
                onClick={handleLogout}
                className="nav-item"
                style={{ color: "f5f590" }}
              >
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
    </header>
  );
};

export default Header;
