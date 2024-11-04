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
          content="Mood tracker, Emotional support, Connect with friends, Mood reflection, Online community, Mental wellness , online chat , "
        />
      </Head>
      <Newhero></Newhero>

      <Faq></Faq>
      <NewsLetter></NewsLetter>
      {/* <Footer></Footer> */}
    </div>
  );
}
