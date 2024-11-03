"use client";

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import "./bl.css";

const blogPosts = [
  {
    id: 1,
    title: "Track Your Mood with Emojis",
    image: "/emoji.jpg",
    description:
      "Learn how to use emojis for easy, everyday mood tracking with Moodli. Tracking your mood with emojis is quick, visual, and can help you easily identify emotional patterns. By consistently logging your mood, you become more self-aware, which can improve emotional intelligence and resilience.",
  },
  {
    id: 2,
    title: "Post the Thought with Moodli",
    image: "/song.jpg",
    description:
      "Share your thoughts and emotions through creative expressions on Moodli, helping you connect with yourself and others. Expressing your thoughts and feelings can be incredibly liberating. With Moodli, you can post your reflections, experiences, and emotions, creating a space for self-discovery and connection. By sharing your insights, you not only track your mood but also engage with a community that values open communication. This practice fosters understanding and empathy, as you discover that many others share similar thoughts and feelings. Whether you're celebrating a joyful moment or navigating a challenging time, posting your thoughts can enhance your emotional journey and inspire others to do the same.",
  },
  {
    id: 3,
    title: "Join Virtual Support Groups on Moodli",
    image: "/chat.jpg",
    description:
      "Enhance your emotional health by joining virtual support groups on Moodli! Connect with individuals facing similar challenges and build a supportive community that fosters understanding and compassion. Sharing experiences in a safe and anonymous environment can significantly reduce feelings of isolation and provide you with the encouragement you need. Moodli's virtual support groups are designed to empower you by creating a sense of belonging and offering valuable insights from others who relate to your struggles. Whether you're navigating stress, anxiety, or any other life challenges, our community is here to support you every step of the way. Take the first step towards emotional wellness and join a virtual support group on Moodli today!",
  },

  {
    id: 4,
    title: "The Science Behind Mood Tracking",
    image: "/science.jpg",
    description:
      "Understand the science behind mood tracking and how it impacts emotional health. Mood tracking is scientifically proven to improve emotional awareness and overall well-being. Learn how tracking your feelings daily can help you better manage emotional triggers.",
  },
  {
    id: 5,
    title: "Find Like-Minded Friends with Moodli",
    image: "/mess.jpg",
    description:
      "Unlock the power of connection with Moodli!  In today’s digital age, finding like-minded individuals who resonate with your emotional experiences is easier than ever. With Moodli's innovative location-based features, you can discover and connect with friends who share your interests, values, and feelings. This unique platform enhances your ability to forge meaningful relationships, promoting a sense of belonging and understanding.  Building friendships based on mutual experiences not only enriches your social life but also boosts your emotional well-being. Engaging with others who understand your journey can provide invaluable support and encouragement, helping you navigate life’s ups and downs. Whether you're seeking companionship, advice, or simply someone to share your thoughts with, Moodli creates a welcoming environment for genuine connections.  Learn how to leverage Moodli’s features to enhance your social network, share your experiences, and uplift your mood. Start connecting today and become part of a community that values emotional wellness and shared understanding. Join Moodli and take the first step towards building fulfilling friendships that make a positive impact on your life!",
  },
  {
    id: 6,
    title: "Self-Reflection Exercises to Enhance Your Mood",
    image: "/girl.jpg",
    description:
      "Explore self-reflection exercises that can boost your emotional well-being. Engaging in self-reflection exercises can help you understand your emotions better. Use Moodli to document your thoughts and feelings, enabling deeper insights and personal growth. Self-reflection can be a powerful tool for emotional healing and development.",
  },
  {
    id: 7,
    title: "Daily Mood Logs: How to Start and Stick With It",
    image: "/science.jpg",
    description: ` Unlock the transformative power of daily mood logs with Moodli!  Daily mood logging is an effective tool for improving emotional well-being and self-awareness. This practice encourages you to record your feelings each day, helping you identify patterns, triggers, and emotional fluctuations.
 Starting is simple: choose a user-friendly platform like Moodli, set a daily reminder, and spend just a few minutes reflecting on your day. Create a supportive environment where you feel comfortable expressing your thoughts. This can lead to enhanced emotional intelligence and improved mental health outcomes over time. 
     Stick with it by making mood logging a part of your daily routine—consider it a form of self-care. The benefits of daily mood tracking extend beyond personal insight; they can also help you communicate more effectively with mental health professionals by providing them with a clearer picture of your emotional state. 
    Start your journey today with Moodli and experience the profound impact that daily mood logs can have on your life. Join a community of users who are committed to understanding their emotions better and achieving greater well-being!"

`,
  },
  {
    id: 8,
    title: "The Benefits of Sharing Your Feelings in an Anonymous Space",
    image: "/chat.jpg",
    description:
      "Discover the powerful benefits of sharing your feelings in an anonymous space with Moodli!In today's fast-paced world, mental health is more important than ever. Anonymity can provide a safe haven for individuals seeking to express their emotions without the fear of judgment. Sharing your feelings can lead to increased emotional relief, reduced feelings of isolation, and a sense of community among those facing similar challenges.By opening up in a confidential setting, users can explore their emotions more freely, which can be crucial for personal growth and healing. Anonymous platforms like Moodli create a unique opportunity to connect with others, gain diverse perspectives, and find support from a community that truly understands. Engaging in discussions about mental health can break down stigmas and empower individuals to seek help and foster open communication. Additionally, sharing your experiences can contribute to a larger dialogue about emotional well-being, helping others feel less alone in their struggles. Make the most of your emotional journey by leveraging the benefits of anonymity. Join Moodli today to connect, share, and grow in a secure environment where your feelings matter. Experience the transformative impact of sharing your thoughts and become part of a compassionate community committed to mental wellness!",
  },
];

export default function Page() {
  return (
    <div className="blog-container">
      <Head>
        <title>Moodli Blog - Track Your Mood, Enhance Your Well-Being</title>
        <meta
          name="description"
          content="Explore insightful articles about mood tracking, emotional health, and building better habits. Learn how Moodli helps track your emotional journey."
        />
        <meta
          name="keywords"
          content="Moodli, mood tracking, anonymous chat, virtual support groups, find like-minded friends, self-reflection exercises, emotional well-being, mindfulness, connect with people , tracker mood
mood tracker
mood tracker journal
mood chart"
        />
        <link rel="canonical" href="https://moodli.site/blog" />
      </Head>

      <h1 className="blog-heading">Moodli Blog</h1>

      <div className="blog-cards">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="blog-section">
        <h2 className="blog-section-title">Upsides of Mood Tracking</h2>
        <p className="blog-section-text">
          Mood tracking offers numerous benefits for emotional well-being. By
          consistently logging your emotions, you can gain valuable insights
          into your emotional triggers and patterns. This allows you to take
          control of your mental health by making informed decisions based on
          real data.
        </p>
        <p className="blog-section-text">
          It also helps in building emotional intelligence, as you start
          recognizing how certain events or interactions affect your mood.
          Tracking your emotions over time can highlight areas where you might
          need to make changes, such as adjusting your routine or seeking
          support.
        </p>

        <div className="blog-section">
          <div className="blog-subsection">
            <h2 className="blog-subsection-title">Benefits of Mood Tracking</h2>
            <p className="blog-subsection-text">
              <strong>Enhanced Self-Awareness:</strong> By keeping a consistent
              record of your moods, you can develop a deeper understanding of
              your emotional patterns. This self-awareness enables you to
              identify triggers that lead to positive or negative emotions,
              empowering you to make conscious choices in your daily life.
            </p>
            <p className="blog-subsection-text">
              <strong>Improved Mental Health Management:</strong> Mood tracking
              can serve as a powerful tool for managing mental health conditions
              such as anxiety and depression. By documenting your mood
              fluctuations, you can share this data with your mental health
              professional, providing them with critical insights into your
              emotional state over time.
            </p>
            <p className="blog-subsection-text">
              <strong>Goal Setting and Motivation:</strong> With insights from
              your mood tracking, you can set specific goals to improve your
              emotional well-being. Tracking your progress can also serve as
              motivation, encouraging you to maintain healthy habits that
              contribute to your happiness.
            </p>

            <h2 className="blog-subsection-title">
              Practical Tips for Effective Mood Tracking
            </h2>
            <p className="blog-subsection-text">
              <strong>Choose a Method That Works for You:</strong> There are
              various ways to track your mood, from using apps like Moodli to
              keeping a physical journal. Consistency is key, so pick a format
              you’ll enjoy.
            </p>
            <p className="blog-subsection-text">
              <strong>Be Honest and Open:</strong> When logging your mood, it’s
              essential to be honest about how you’re feeling. The more
              authentic your entries, the more valuable your insights will be.
            </p>
            <p className="blog-subsection-text">
              <strong>Reflect on Your Entries:</strong> Take time each week to
              review your mood entries. Look for patterns, triggers, and changes
              in your emotional state.
            </p>

            <h2 className="blog-subsection-title">Conclusion</h2>
            <p className="blog-subsection-text">
              Mood tracking can be a transformative practice that enhances your
              emotional well-being. By becoming aware of your moods and
              patterns, you can make informed decisions that promote a healthier
              mindset and lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const BlogCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const isLongDescription = post.description.length > 300;

  return (
    <div className="blog-card">
      <Image
        src={post.image}
        alt={post.title}
        width={400}
        height={250}
        className="blog-card-image"
      />
      <div className="blog-card-content">
        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-description">
          {isLongDescription && !isExpanded
            ? post.description.slice(0, 300) + "..."
            : post.description}
        </p>
        {isLongDescription && (
          <button className="blog-card-button" onClick={toggleDescription}>
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};
