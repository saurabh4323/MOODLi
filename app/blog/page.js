"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import "./bl.css";
const blogPosts = [
  {
    id: 1,
    title: "Track Your Mood with Emojis",
    image: "/emoji.jpg",
    description:
      "Learn how to use emojis for easy, everyday mood tracking with Moodli.",
    content: `Tracking your mood with emojis is quick, visual, and can help you easily identify emotional patterns. By consistently logging your mood, you become more self-aware, which can improve emotional intelligence and resilience.`,
  },
  {
    id: 2,
    title: "Music for Every Mood",
    image: "/song.jpg",
    description:
      "Discover curated playlists to match your emotional state with Moodli's mood tracker.",
    content: `Music has the power to elevate mood and connect you with your emotions. A personalized playlist can enhance mood tracking by offering music that resonates with how you're feeling.`,
  },
  {
    id: 3,
    title: "Connect with People Sharing Your Mood",
    image: "/chat.jpg",
    description:
      "Join communities and chat with people experiencing the same mood.",
    content: `Moodli's chat feature connects you with individuals experiencing similar emotional states, helping foster empathy, understanding, and shared support.`,
  },
  {
    id: 4,
    title: "The Science Behind Mood Tracking",
    image: "/science.jpg",
    description:
      "Understand the science behind mood tracking and how it impacts emotional health.",
    content: `Mood tracking is scientifically proven to improve emotional awareness and overall well-being. Learn how tracking your feelings daily can help you better manage emotional triggers.`,
  },
  {
    id: 5,
    title: "Creating a Daily Mood Routine",
    image: "/mess.jpg",
    description:
      "Set up a consistent mood tracking routine to boost emotional health.",
    content: `Establishing a daily habit of mood tracking with Moodli will help you recognize patterns, manage stress, and promote mental health. Consistency is the key to long-term emotional awareness.`,
  },
  {
    id: 6,
    title: "Mindfulness Techniques for Mood Enhancement",
    image: "/girl.jpg",
    description:
      "Explore mindfulness practices that can enhance your mood and emotional well-being.",
    content: `Incorporating mindfulness techniques into your daily routine can significantly improve your mood. Practices such as meditation, deep breathing exercises, and mindful walking can help ground you in the present moment, reducing stress and promoting a positive emotional state. Consistent mindfulness can lead to a greater sense of peace and emotional resilience.`,
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
      </Head>

      {/* Moodli Blog Heading */}
      <h1 className="blog-heading">Moodli Blog</h1>

      {/* Blog Cards Section */}
      <div className="blog-cards">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="blog-card-image"
            />
            <div className="blog-card-content">
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-description">{post.description}</p>
              {/* <Link href={`/blog/${post.id}`}> */}
              <button className="blog-card-button">Read More</button>
              {/* </Link> */}
            </div>
          </div>
        ))}
      </div>

      {/* Upsides and Downsides Section */}
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

        <div className="blog-subsection">
          <h2 className="blog-subsection-title">Benefits of Mood Tracking</h2>
          <p className="blog-subsection-text">
            <strong>Enhanced Self-Awareness:</strong> By keeping a consistent
            record of your moods, you can develop a deeper understanding of your
            emotional patterns. This self-awareness enables you to identify
            triggers that lead to positive or negative emotions, empowering you
            to make conscious choices in your daily life.
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
            essential to be honest about how you’re feeling. The more authentic
            your entries, the more valuable your insights will be.
          </p>
          <p className="blog-subsection-text">
            <strong>Reflect on Your Entries:</strong> Take time each week to
            review your mood entries. Look for patterns, triggers, and changes
            in your emotional state.
          </p>

          <h2 className="blog-subsection-title">Conclusion</h2>
          <p className="blog-subsection-text">
            Mood tracking can be a transformative practice that enhances your
            emotional well-being. By becoming aware of your moods and patterns,
            you can make informed decisions that promote a healthier mindset and
            lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
}
