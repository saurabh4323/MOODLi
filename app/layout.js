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
import Link from "next/link";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [heroopen, setheroopen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/main"); // Use `router.push` instead of `<Link />` for navigation inside useEffect
      }
    }
  }, [router]);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    initialTheme === "dark" ? enableDarkMode() : enableLightMode();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    newTheme === "dark" ? enableDarkMode() : enableLightMode();
    toggleDarkMode();
  };

  return (
    <html lang="en">
      <script
        async="async"
        data-cfasync="false"
        src="//thubanoa.com/1?z=8443200"
      ></script>
      <Head>
        <title>Moodli - Track Your Mood and Make Friends</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-adsense-account" content="ca-pub-3406368595814210" />
        <meta name="monetag" content="2dd97c23f06425300d541e99b197e7a0" />

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="Moodli is your go-to platform for tracking moods, sharing emotions, and making friends. Join an anonymous chat community to explore your feelings, connect with locals, and enhance your mental wellness."
        />
        <meta
          name="keywords"
          content="Anonymous chat app, Mood tracking and chat, Share your thoughts anonymously, Make friends online, Mood reflection posts, Connect with local users, Daily mood updates and posts, Emotional support chat platform, Find like-minded friends, Anonymous support community, Mood logging and sharing, Discover nearby friends, Safe space for sharing emotions, Chat and connect with others, Mood journaling and posting, Build friendships online, Peer support network for moods, Interactive mood diary app, Chat anonymously about feelings, Create and share mood posts, Emotional wellness and friendships, Join a mood-focused community, Daily mood updates and connections, Friendship building app, Digital mood diary, Emotional intelligence app"
        />
        <meta name="author" content="Moodli" />

        {/* Open Graph Meta Tags */}
        <meta property="og:url" content="https://moodli.site" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Moodli - Track Your Mood with AI & Emoji"
        />
        <meta
          property="og:description"
          content="Join Moodli for an anonymous chat, mood tracking, and emotional support. Share your thoughts and connect with like-minded individuals today!"
        />
        <meta property="og:image" content="/path-to-social-image.jpg" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Moodli - Mood Tracking Community" />
        <meta
          name="twitter:description"
          content="Explore your feelings, track your mood, and connect with others in a safe, anonymous environment. Join Moodli now!"
        />
        <meta name="twitter:image" content="/path-to-twitter-image.jpg" />
        <meta name="monetag" content="a1d3fe44aacbd726b1fb33158826f915" />
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
      </Head>

      <body>
        <Toaster />
        <div className="showheader">
          <Header />
        </div>
        <div className="topforphone">
          <Headerphonetop />
        </div>
        <div className="showingg">{children}</div>
        <div className="f">{/* <Footer /> */}</div>
        <div className="forphone">
          <Headerphone />
        </div>
        <Analytic />

        {/* Ad Scripts */}
        <script type="text/javascript">
          {`var infolinks_pid = 3428056; var infolinks_wsid = 0;`}
        </script>
        <Script
          type="text/javascript"
          src="//resources.infolinks.com/js/infolinks_main.js"
        ></Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3406368595814210"
          crossOrigin="anonymous"
        />

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
