"use client";
import Image from "next/image";
import Link from "next/link";
import { enableDarkMode, enableLightMode, getInitialTheme } from "../app/theme";
import useDarkMode from "./useDarkMode";
import { useEffect, useState } from "react";
import "./Header.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for hamburger

const Header = () => {
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

  const handleToggleTheme = () => {
    setIsChecked(!isChecked);
    document.body.classList.toggle("dark", !isChecked);
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
    setMenu(!menu); // Toggle mobile menu visibility
  };

  return (
    <header className="header-container">
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
              <button onClick={handleLogoutClick} className="nav-item">
                Logout
              </button>
            </>
          ) : (
            <Link href="/register" className="nav-item">
              Login
            </Link>
          )}
          <div style={{ textAlign: "center" }}>
            <div
              onClick={handleToggleTheme}
              style={{
                // border: "1px solid #000",
                background:
                  "linear-gradient(to right, #ffffff 50%, #000000 50%)",
                border: "1px solid #fff",
                width: "50px",
                height: "26px",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px",
                cursor: "pointer",
                position: "relative",
              }}
              className="checkbox-label"
            >
              <i className="fas fa-moon" style={{ color: "#f1c40f" }}></i>
              <i className="fas fa-sun" style={{ color: "#f39c12" }}></i>
              <span
                style={{
                  backgroundColor: "#f97243",
                  width: "22px",
                  height: "22px",
                  position: "absolute",
                  borderRadius: "50%",
                  top: "2px",
                  left: isChecked ? "26px" : "2px", // Moves the ball when clicked
                  transition: "transform 0.2s linear",
                }}
                className="ball"
              />
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="mobile-default">
          <Link href="/main" className="nav-item">
            Home
          </Link>
          <Link href="/dashboard" className="nav-item">
            Dashboard
          </Link>
          <Link href="/track" className="nav-item">
            VibeTrack
          </Link>
          {isAuthenticated && (
            <Link href="/profile" className="nav-item">
              Profile
            </Link>
          )}

          <button onClick={toggleMenu} className="hamburger-icon">
            {menu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {menu && (
            <div className="mobile-dropdown">
              <Link href="/community" className="nav-item" onClick={toggleMenu}>
                FeelTalks
              </Link>
              <Link href="/create" className="nav-item" onClick={toggleMenu}>
                MoodMojis
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogoutClick}
                  className="nav-item mobile-logout"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/register"
                  className="nav-item"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
              <div style={{ textAlign: "center" }}>
                <div
                  onClick={handleToggleTheme}
                  style={{
                    border: "1px solid #000",
                    background:
                      "linear-gradient(to right, #ffffff 50%, #000000 50%)",

                    marginLeft: "16px",
                    width: "50px",
                    height: "26px",
                    borderRadius: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  className="checkbox-label"
                >
                  <i className="fas fa-moon" style={{ color: "#f1c40f" }}></i>
                  <i className="fas fa-sun" style={{ color: "#f39c12" }}></i>
                  <span
                    style={{
                      backgroundColor: "#f97243",
                      width: "22px",
                      height: "22px",
                      position: "absolute",
                      borderRadius: "50%",
                      top: "2px",
                      left: isChecked ? "26px" : "2px", // Moves the ball when clicked
                      transition: "transform 0.2s linear",
                    }}
                    className="ball"
                  />
                </div>
              </div>
            </div>
          )}
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
