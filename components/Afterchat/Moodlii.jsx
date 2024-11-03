import React from "react";
import { motion } from "framer-motion";
import "./mooslii.css";
import Feat from "./Feat";
import Head from "next/head";
const Moodlii = () => {
  return (
    <>
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
      <div className="mainn" style={{ display: "flex", width: "100%" }}>
        <div className="feat" style={{ width: "100%", marginTop: "10%" }}>
          <Feat />
        </div>
        <div className="moodlii-container">
          <section className="moodlii-features">
            <div className="moodlii-flex-container">
              {[
                {
                  title: " Track Your Mood",
                  description:
                    "Monitor your emotions effortlessly with our intuitive tracking system, helping you recognize patterns in your mood throughout the day.",
                },
                {
                  title: " Make Friends Online Using Location",
                  description:
                    "Discover and connect with local individuals who share your interests, fostering meaningful  relationships and a sense of community.",
                },
                {
                  title: " Post content ,Chat  Anonymously",
                  description:
                    "Engage in candid discussions without revealing your identity, allowing for honest sharing images and content and support users.",
                },
                {
                  title: " Grow Your Personali -ty with Moodli",
                  description:
                    "Enhance your self-awareness by tracking your mood and getting personalized chart data to improve your mood insights.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="moodlii-feature-card"
                  whileHover={{
                    rotateX: [-10, 0, 10],
                    rotateY: [10, 0, -10],
                    scale: 1.05,
                    transition: { duration: 2 },
                  }}
                >
                  <h4 className="moodlii-feature-title">{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Moodlii;
