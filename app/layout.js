"use client";
// app/layout.js

import { useEffect, useState } from "react";
import { enableDarkMode, enableLightMode, getInitialTheme } from "./theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytic from "./Analytic";
import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css"; // Import your global styles
import useDarkMode from "@/components/useDarkMode";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [theme, setTheme] = useState("light"); // Default to light mode
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [heroopen, setheroopen] = useState(false);

  // On component mount, check for the initial theme
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }, []);

  // Toggle between dark and light mode
  const handleToggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      enableDarkMode();
      router.push("/dashboard");
    } else {
      setTheme("light");
      enableLightMode();
      router.push("/dashboard");
    }
    toggleDarkMode(); // Call the hook's toggle function
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MOODLI</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8925928685447144"
          crossOrigin="anonymous"
        ></Script>

        <Header />

        {/* Dark/Light Mode Toggle Buttons */}
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button
            onClick={handleToggleTheme}
            style={{
              padding: "10px 20px",
              backgroundColor: theme === "dark" ? "#fff" : "#000",
              color: theme === "dark" ? "#000" : "#fff",
              border: "none",
              borderRadius: "5px",
              height: "40px",
              marginLeft: "85%", // Default margin
              cursor: "pointer",
            }}
            className="toggle-button" // Add a class for media query styling
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        {children}

        <ConsentBanner />
        <Footer />
        <Analytic />

        <style jsx>{`
          @media (max-width: 600px) {
            .toggle-button {
              margin-left: 40%;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
