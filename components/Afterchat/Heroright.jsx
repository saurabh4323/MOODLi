"use client";
import React from "react";
import Image from "next/image"; // Import Image from Next.js
import "./hr.css";
import Head from "next/head";
export default function Heroright() {
  return (
    <div className="coright">
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
      <div className="ima">
        <div className="first">
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/scream.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/sleepy.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/smiley.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/sob.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
        </div>
        <div className="second">
          <Image
            src="/heart_eyes.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />
          <Image src="/sleepy.png" alt="joy" width={150} height={150} />
          <Image
            src="/sweat_smile.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />
          <Image src="/confused.png" alt="joy" width={150} height={150} />
          <Image
            src="/sweat_smile.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />
          <Image src="/sob.png" alt="joy" width={150} height={150} />
          <Image
            src="/heart_eyes.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />
          {/* <Image src="/joy.png" alt="joy" width={150} height={150} /> */}
          <Image src="/joy.png" alt="joy" width={150} height={150} />
          <Image
            src="/sweat_smile.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />
          <Image src="/joy.png" alt="joy" width={150} height={150} />
          <Image
            src="/sweat_smile.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />
        </div>
        <div className="third">
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/scream.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/scream.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />

          <Image src="/scream.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}
