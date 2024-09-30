// useDarkMode.js
import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeStatus = localStorage.getItem("theme") === "dark";
    setIsDarkMode(darkModeStatus);
    document.body.classList.toggle("dark-mode", darkModeStatus); // Apply dark mode class
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light"); // Update localStorage
    document.body.classList.toggle("dark-mode", newDarkMode); // Apply or remove dark mode class
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
