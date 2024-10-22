"use client";
import React, { useState } from "react";
import Users from "../Afterchat/Users";
import Pulseright from "./Pulseright";
import { Menu } from "lucide-react";
import "./style.css";

export default function Pulse() {
  // State to manage the hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="pulse" style={{ maxHeight: "102vh" }}>
      <div className="hamburger" onClick={toggleMenu}>
        <Menu color="#ffffff" />
      </div>

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
        <div className={`pright ${isMenuOpen ? "hidden" : ""}`}>
          <Pulseright />
        </div>
      </div>
    </div>
  );
}
