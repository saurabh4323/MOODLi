"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    console.log("Auth Status:", authStatus);
    setIsAuthenticated(authStatus);
  }, []);
  const userId = localStorage.getItem("userId");
  console.log("user id", userId);
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  console.log("Rendering Header, isAuthenticated:", isAuthenticated);

  return (
    <header className="header-container">
      <div className="header-content">
        <Image src="/logo.svg" alt="Logo" width={500} height={500} />
        <nav className="nav">
          <Link href="/main" className="nav-item">
            Home
          </Link>
          <Link href="/dashboard" className="nav-item">
            Dashboard
          </Link>
          <Link href="/track" className="nav-item">
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
