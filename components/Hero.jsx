"use client";
import Link from "next/link";
import Button from "./Button";
import "./hero.css"; // Ensure your CSS file path is correct
import Head from "next/head";
import "./MoodRecommendation.css";
import { useState, useEffect } from "react";
import MoodRecommendations from "./MoodRecommendations";

export default function Hero(props) {
  const [showCard, setShowCard] = useState(false);
  const [selectemoji, setselectemoji] = useState("😀");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    console.log("Auth Status:", authStatus); // Debug log
    setIsAuthenticated(authStatus);
  }, []);

  const emojihandle = (emoji) => {
    setselectemoji(emoji);
    setShowCard(true);
  };

  const handleClose = () => {
    setShowCard(false);
  };

  let link;
  if (isAuthenticated) {
    link = (
      <Link href={"/dashboard"}>
        <Button className="button">Get Started</Button>
      </Link>
    );
  } else {
    link = (
      <Link href={"/register"}>
        <Button className="button">Get Started</Button>
      </Link>
    );
  }

  return (
    <>
      <Head>
        <title>Track Your Mood</title>
      </Head>

      <div className="container">
        {/* Use className for CSS */}
        <div className="background-shapes"></div>
        <div className="background-shape"></div>
        <div className="background-shap"></div>
        <div className="emoji">
          {/* <h1 className="emo">😅</h1>
          <h1 className="emo">😊</h1>
          <h1 className="emo">😀</h1> */}
        </div>
        <div className="content">
          <div className="text-wrapper">
            <h1 className="title">
              Track Your <span className="spn">Mood</span>
            </h1>
            <p className="subtitle">Understand and manage your emotions</p>
          </div>
          {link}
          <div className="visual-wrapper">
            <div className="circular-element">
              <h1 className="selectedemoji">{selectemoji}</h1>
            </div>
            <div className="floating-emojis"></div>
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

        <MoodRecommendations
          selectedEmoji={selectemoji}
          showCard={showCard}
          onClose={handleClose}
        />

        {/* <div className="emoj">
          <h1 className="emk">🥰</h1>
          <h1 className="emk">🥹</h1>
          <h1 className="emk">😎</h1>
        </div> */}
      </div>
    </>
  );
}
