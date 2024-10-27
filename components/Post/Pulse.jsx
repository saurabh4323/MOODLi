"use client";
import React, { useState, useEffect } from "react";
import Users from "../Afterchat/Users";
import Pulseright from "./Pulseright";
import { Menu } from "lucide-react";
import "./style.css";
import axios from "axios";
import { useRouter } from "next/navigation";

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

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="pulse" style={{ maxHeight: "102vh" }}>
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
        <div className="pright">
          <Pulseright />
        </div>
      </div>
    </div>
  );
}
