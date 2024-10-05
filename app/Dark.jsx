"use client";
import React from "react";
import "./globals.css";
import { enableDarkMode, enableLightMode, getInitialTheme } from "./theme";
import Image from "next/image";
import { useEffect, useState } from "react";
import useDarkMode from "@/components/useDarkMode";
export default function Dark() {
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
  return;
  <div style={{ textAlign: "center" }}>
    <button
      onClick={handleToggleTheme}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
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
        width={40}
        height={35}
        src={"/lm.png"}
        style={{ position: "absolute" }}
        className="transition-transform duration-500 hover:scale-75 hover:rotate-12 hover:opacity-80"
      />
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  </div>;
}
