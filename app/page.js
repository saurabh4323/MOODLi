"use client";
import Heros from "@/components/Heros";
import Image from "next/image";
import Head from "next/head";
import Newhero from "@/components/Afterchat/Newhero";
import NewsLetter from "@/components/Afterchat/NewsLetter";
import Faq from "@/components/Afterchat/Faq";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useState for managing state
import Pulse from "@/components/Post/Pulse";
import Loading from "@/components/Loading";

export default function Home() {
  const route = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null); // State to track user login status

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      setIsUserLoggedIn(!!userId); // Set state based on userId presence
    }
  }, [route]); // Add route as a dependency

  return (
    <div>
      <Head>
        <title>Moodli - Your Anonymous Mood Tracking and Chat Platform</title>
        <meta
          name="description"
          content="Join Moodli to track your mood, connect with friends, and share feelings. Experience a supportive community and powerful insights tailored for you."
        />
        <meta
          name="keywords"
          content="Anonymous chat app, mood tracking, mood sharing platform, location-based connections, make friends online, daily mood updates, emotional support community, connect with locals, mood tracking features, self-discovery network, mental wellness chat, share your feelings, find like-minded friends, mood reflection posts, safe space for emotions, anonymous support groups, mood logging tool, emotional intelligence app, discover nearby users, friendship building app, interactive mood journal, personal growth community, well-being chat features, peer support network, share your thoughts anonymously, digital mood diary, chat and connect with others, mood journaling and posting, build friendships online, peer support network for moods, interactive mood diary app, chat anonymously about feelings, create and share mood posts, emotional wellness and friendships, join a mood-focused community, daily mood updates and connections, friend-making and mood sharing, digital platform for mood and chat"
        />
      </Head>
      {/* Conditional rendering based on user login status */}
      {isUserLoggedIn === null ? (
        <div>
          <Loading></Loading>
        </div> // Optional loading state while checking user login
      ) : isUserLoggedIn ? (
        <Pulse />
      ) : (
        <>
          <Newhero />
          <Faq />
          <NewsLetter />
        </>
      )}
    </div>
  );
}
