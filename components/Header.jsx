"use client";
import Image from "next/image";
import Link from "next/link";
import { enableDarkMode, enableLightMode, getInitialTheme } from "../app/theme";
import useDarkMode from "./useDarkMode";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [menu, setMenu] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { toggleDarkMode } = useDarkMode();
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
      setIsAuthenticated(authStatus);

      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  return (
    <header className="header-container">
      <div className="header-content">
        <Image
          className="logoo"
          src="/l.png"
          alt="Logo"
          width={70}
          height={70}
        />

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
              <button className="nav-item">Logout</button>
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
              marginBottom: "25px",
              marginLeft: "40px",
              color: theme === "dark" ? "#000" : "#fff",
              border: "none",
              borderRadius: "5px",
              height: "40px",

              cursor: "pointer",
            }}
            className="toggle-button"
          >
            <Image
              alt="Theme Toggle Icon"
              width={25}
              height={30}
              src={"/lm.png"}
              style={{
                position: "absolute",
                marginLeft: "-15px",
                // marginTop: "3px",
              }}
              className="transition-transform duration-500 hover:scale-75 hover:rotate-12 hover:opacity-80"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
