"use client";
import Image from "next/image";
import styles from "./Heros.module.css"; // Import the CSS file
import Hero from "./Hero";
// import "./profile.css";
// import "./Afterchat/ky.css";
import a from "./images/a.png";
import b from "./images/b.png";
import c from "./images/c.png";
import d from "./images/d.png";
import s from "./images/e.png";
import { useState } from "react";
import Knowyourself from "./Afterchat/Knowyourself";
import Button from "./Button";

const Heros = () => {
  const [showky, setshowky] = useState(false);

  const clo = () => {
    setshowky(false);
  };

  return (
    <div className="mainhero">
      <div className={styles.heroSection}>
        <div
          className={styles.backgroundImage}
          style={{ borderTopRightRadius: "40px" }}
        >
          <Image src={"/vector.png"} alt="Background vector" layout="fill" />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Elevate Your Emotion with our Moodli</h1>
          <p className={styles.subtitle}>
            Empower Yourself with Self-awareness, Track Your Emotions, <br />
            chat with community and Unleash a Happier You
          </p>

          <button className={styles.button} onClick={() => setshowky(true)}>
            Know Yourself
          </button>

          {showky && (
            <div
              className="mood-overlay"
              style={{
                position: "absolute", // Fixed to cover the entire viewport
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                width: "100%",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
                // backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <Knowyourself />
            </div>
          )}

          <Hero />
        </div>
        <div className={styles.emotionsSection}>
          {/* Group 1 */}
          <div className={styles.emotionGroup}>
            <Image
              src={c}
              alt="Group 1 Emotion"
              width={150}
              height={100}
              unoptimized
            />
          </div>

          {/* Group 2 */}
          <div className={styles.emotionGroup}>
            <Image
              src={s}
              alt="Group 2 Emotion"
              width={175}
              height={100}
              unoptimized
            />
          </div>

          {/* Group 3 */}
          <div className={styles.emotionGroup}>
            <Image
              src={a}
              alt="Group 3 Emotion"
              width={175}
              unoptimized
              height={100}
            />
          </div>

          <div className={styles.emotionGroup}>
            <Image
              src={b}
              alt="Group 4 Emotion"
              width={175}
              unoptimized
              height={100}
            />
          </div>

          <div className={styles.emotionGroup}>
            <Image
              src={d}
              alt="Group 5 Emotion"
              width={150}
              unoptimized
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heros;
