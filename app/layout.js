"use client";
import { useEffect, useState } from "react";
import { enableDarkMode, enableLightMode, getInitialTheme } from "./theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytic from "./Analytic";

import Head from "next/head";
import "./globals.css"; // Import your global styles
import useDarkMode from "@/components/useDarkMode";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import the Image component from Next.js
import NeonCursor from "@/components/NeonCursor";
import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner";
export default function RootLayout({ children }) {
  const router = useRouter();
  const [theme, setTheme] = useState("dark"); // Default to dark mode
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

    // Force reflow
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }, []);

  // Toggle between dark and light mode
  const handleToggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      enableDarkMode();
    } else {
      setTheme("light");
      enableLightMode();
    }
    toggleDarkMode(); // Call the hook's toggle function
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-3455923870560500"
        ></meta>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="monetag" content="2dd97c23f06425300d541e99b197e7a0"></meta>
        <head>
          <meta
            name="description"
            content="Track your mood with emojis, connect with others, and chat with like-minded people. Use AI to monitor your emotions and get personalized insights. Join the Moodli community and start your journey today"
          />
        </head>

        <title>Moodli</title>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <Head>
        <title>Moodli</title>
        <meta
          name="description"
          content="Welcome to Moodli, your mood-tracking community. Track your mood with emoji and join the community and chat with people . Get started now!"
        />
      </Head>

      <Head>
        <title>Moodli Blog - Track Your Mood, Enhance Your Well-Being</title>
        <meta
          name="description"
          content="Explore insightful articles about mood tracking, emotional health, and building better habits. Learn how Moodli helps track your emotional journey."
        />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3455923870560500"
        crossorigin="anonymous"
      ></Script>
      <body>
        <Header />
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
              marginLeft: "85%", // Default margin
              cursor: "pointer",
            }}
            className="toggle-button" // Add a class for media query styling
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
        </div>

        {children}
        <ConsentBanner></ConsentBanner>
        <NeonCursor></NeonCursor>
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
