"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./hl.css";
import { useRouter } from "next/navigation";
import Head from "next/head";
export default function Heroleft() {
  const router = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* SEO Meta Tags */}
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

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={itemVariants}
        className="coleft"
      >
        <motion.h5 variants={itemVariants} className="nft">
          Welcome to Moodli
        </motion.h5>
        <div className="dash"></div>
        <h1 className="hhhk">
          Track Your Mood, Make New Friends, and Discover Powerful Insights.
        </h1>

        <motion.p variants={itemVariants} className="ppp">
          Ever wonder how your mood changes throughout the day? At Moodli, you
          can track your emotions, share your feelings with friends, and get
          insights and suggestions tailored to your current mood. Connect,
          Share, and Get Support Easily.
        </motion.p>

        <motion.button
          variants={itemVariants}
          className="kbutton"
          onClick={() => {
            router.push("/register");
          }}
        >
          Get Connected
        </motion.button>
      </motion.div>
    </>
  );
}
