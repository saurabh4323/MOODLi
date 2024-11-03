import Faq from "@/components/Afterchat/Faq";
import Newhero from "@/components/Afterchat/Newhero";
import NewsLetter from "@/components/Afterchat/NewsLetter";
import Footer from "@/components/Footer";
import Heros from "@/components/Heros";
import Head from "next/head";
import React from "react";

export default function page() {
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
      <Newhero></Newhero>

      <Faq></Faq>
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </div>
  );
}
