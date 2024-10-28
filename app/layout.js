"use client";
import { useEffect, useState } from "react";
import { enableDarkMode, enableLightMode, getInitialTheme } from "./theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytic from "./Analytic";
import Script from "next/script";
import Head from "next/head";
import "./globals.css";
import useDarkMode from "@/components/useDarkMode";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NeonCursor from "@/components/NeonCursor";
import ConsentBanner from "@/components/ConsentBanner";
import { Toaster } from "react-hot-toast";
import Feedback from "@/components/Feedback";
import Headerphone from "@/components/Headerphone";
import Headerphonetop from "@/components/Headerphonetop";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [heroopen, setheroopen] = useState(false);

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

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-adsense-account" content="ca-pub-3455923870560500" />
        <meta name="monetag" content="2dd97c23f06425300d541e99b197e7a0" />

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="Track your mood, emotions, and mental health with Moodli. Get AI-powered insights, chat with the community, and use emojis to track your mood. Join today for free!"
        />
        <meta
          name="keywords"
          content="mood tracker, emotion tracking, mental health, AI mood tracking, mood analysis, emotion monitoring, mood chart, AI emotion, mood swings, mental wellness, daily mood check ,chat"
        />
        <meta name="author" content="Moodli" />

        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:url" content="https://moodli.site" />
        <meta property="og:type" content="website" />
        <meta property="og:moodli" content="https://moodli.site" />
        <meta
          property="og:title"
          content="Moodli - Track Your Mood with AI & Emoji"
        />
        <meta
          property="og:description"
          content="Track your mood with emojis, get AI-powered insights, and connect with others in the Moodli community. Start tracking your emotions today!"
        />
        <meta property="og:image" content="/path-to-social-image.jpg" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Moodli - Mood Tracking Community" />
        <meta
          name="twitter:description"
          content="Track your mood with emojis and use AI insights to improve mental health. Join the Moodli community today!"
        />
        <meta name="twitter:image" content="/path-to-twitter-image.jpg" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Moodli - Mood Tracker & Community</title>
      </head>
      <Head>
        <title>Moodli - Track Your Mood</title>
        <meta
          name="description"
          content="Welcome to Moodli, the best mood tracker powered by AI and emojis. Start tracking your mood and emotions, connect with a community, and gain valuable insights into your mental health!"
        />
      </Head>

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3455923870560500"
        crossorigin="anonymous"
      />

      {/* Chatbot Script */}
      {/* <Script
        src="https://www.chatbase.co/embed.min.js"
        defer
        onLoad={() => {
          window.embeddedChatbotConfig = {
            chatbotId: "1reHM86OqajPcWfR4k5u9",
            domain: "www.chatbase.co",
          };
        }}
      /> */}

      <body>
        <div className="showheader">
          <Header />
        </div>
        <div className="topforphone">
          <Headerphonetop></Headerphonetop>
        </div>
        <Toaster />
        <div className="showingg">{children}</div>
        {/* <ConsentBanner /> */}
        <div className="f">
          <Footer />
        </div>
        <div className="forphone">
          <Headerphone></Headerphone>
        </div>
        <Analytic />
        <style jsx>{`
          @media (max-width: 600px) {
            .toggle-button {
              marginleft: "40%"; // Changed to object format
            }
          }
        `}</style>
      </body>
    </html>
  );
}
