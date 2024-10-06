// Hero.js
"use client";
import Link from "next/link";
import Button from "./Button";
import "./hero.css";
import Head from "next/head";
import Image from "next/image";
import a from "./images/a.png";
import b from "./images/b.png";
import c from "./images/c.png";
import d from "./images/d.png";
import s from "./images/e.png";
import React, { useEffect, useState } from "react";
import MoodRecommendations from "./MoodRecommendations";
import useDarkMode from "./useDarkMode";

export default function Hero(props) {
  const [showCard, setShowCard] = useState(false);
  const [selectemoji, setSelectEmoji] = useState("😀");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const emojihandle = (emoji) => {
    setSelectEmoji(emoji);
    setShowCard(true);
  };

  const handleClose = () => {
    setShowCard(false);
  };

  const handleMouseMove = (e) => {
    const emojis = document.querySelectorAll(".object");
    emojis.forEach((emoji, index) => {
      const offset = (index + 1) * 5;
      const x = (e.clientX / window.innerWidth) * offset;
      const y = (e.clientY / window.innerHeight) * offset;
      emoji.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
        <title>Moodli</title>
        <meta
          name="description"
          content="Welcome to Moodli, the best mood tracker powered by AI and emojis. Start tracking your mood and emotions, connect and chat with a community, and gain valuable insights into your mental health!"
        />
      </Head>
      <div className="container">
        <div className="background1"></div>
        <div className="background2"></div>
        <div className="background3"></div>

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
