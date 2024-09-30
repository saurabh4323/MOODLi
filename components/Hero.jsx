"use client";
import Link from "next/link";
import Button from "./Button";
import "./hero.css"; // Ensure your CSS file path is correct
import Head from "next/head";
import "./MoodRecommendation.css";
import { useState, useEffect } from "react";
import MoodRecommendations from "./MoodRecommendations";
import Script from "next/script"; // Use next/script for external scripts
import useAds from "./UseAdhs";

export default function Hero(props) {
  useAds();
  const [showCard, setShowCard] = useState(false);
  const [selectemoji, setselectemoji] = useState("😀");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authentication check
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    console.log("Auth Status:", authStatus); // Debug log
    setIsAuthenticated(authStatus);
  }, []);

  // Handle emoji selection
  const emojihandle = (emoji) => {
    setselectemoji(emoji);
    setShowCard(true);
  };

  const handleClose = () => {
    setShowCard(false);
  };

  // Conditional link based on authentication
  let link;
  if (isAuthenticated) {
    link = (
      <Link href="/dashboard">
        <Button className="button">Get Started</Button>
      </Link>
    );
  } else {
    link = (
      <Link href="/register">
        <Button className="button">Get Started</Button>
      </Link>
    );
  }

  return (
    <>
      <Head>
        <title>Track Your Mood</title>
      </Head>

      {/* External Chatbot script */}
      {/* <Script
        src="https://www.chatbase.co/embed.min.js"
        chatbotId="deZwZMHfpb9Us_5_rOqh6"
        domain="www.chatbase.co"
        strategy="lazyOnload" // Loads after the main content
      ></Script> */}

      <div className="container">
        {/* Use className for CSS */}
        <div className="background-shapes"></div>
        <div className="background-shape"></div>
        <div className="background-shap"></div>

        <div className="content">
          <div className="text-wrapper">
            <h1 className="title">
              what&apos;s Your <span className="spn">Mood NOW</span>
            </h1>
            <p className="subtitle">Understand and manage your emotions</p>
          </div>

          {link}

          <div className="visual-wrapper">
            <div className="circular-element">
              <h1 className="selectedemoji">{selectemoji}</h1>
            </div>

            <div className="graph-lines">
              <div
                className="graph-dot"
                style={{ left: "10%" }}
                onClick={() => emojihandle("🥰")}
              >
                🥰
              </div>
              <div
                className="graph-dot"
                style={{ left: "30%" }}
                onClick={() => emojihandle("😭")}
              >
                😭
              </div>
              <div
                className="graph-dot"
                style={{ left: "50%" }}
                onClick={() => emojihandle("😀")}
              >
                😀
              </div>
              <div
                className="graph-dot"
                style={{ left: "70%" }}
                onClick={() => emojihandle("😡")}
              >
                😡
              </div>
              <div
                className="graph-dot"
                style={{ left: "90%" }}
                onClick={() => emojihandle("😪")}
              >
                😪
              </div>
            </div>
          </div>
        </div>

        {/* Mood recommendation cards */}
        <MoodRecommendations
          selectedEmoji={selectemoji}
          showCard={showCard}
          onClose={handleClose}
        />

        {/* Chatbot Iframe */}
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/deZwZMHfpb9Us_5_rOqh6"
          width="80%"
          style={{ display: "none" }} // Fix inline styles
          frameBorder="0"
        ></iframe>
      </div>
    </>
  );
}
