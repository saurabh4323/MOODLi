"use client";
import Link from "next/link";
import Button from "./Button";
import "./hero.css"; // Ensure your CSS file path is correct
import Head from "next/head";

export default function Hero(props) {
  const auth = true;
  let link;
  if (auth) {
    link = (
      <Link href={"/dashboard"}>
        <Button className="button">Get Started</Button>
      </Link>
    );
  } else {
    link = (
      <Link href={"/profile"}>
        <Button className="button">Get Started</Button>
      </Link>
    );
  }

  return (
    <>
      <Head>
        <title>Track Your Mood</title>
      </Head>

      <div className="container">
        {" "}
        {/* Use className for CSS */}
        <div className="background-shapes"></div>
        <div className="background-shape"></div>
        <div className="background-shap"></div>
        <div className="emoji">
          <h1 className="emo">😅</h1>
          <h1 className="emo">😊</h1>
          <h1 className="emo">😀</h1>
        </div>
        <div className="content">
          <div className="text-wrapper">
            <h1 className="title">
              Track Your <span className="spn">Mood</span>
            </h1>
            <p className="subtitle">Understand and manage your emotions</p>
          </div>
          {link}
          <div className="visual-wrapper">
            <div className="circular-element"></div>
            <div className="floating-emojis"></div>
            <div className="graph-lines">
              <div className="graph-dot" style={{ left: "10%" }}></div>
              <div className="graph-dot" style={{ left: "30%" }}></div>
              <div className="graph-dot" style={{ left: "50%" }}></div>
              <div className="graph-dot" style={{ left: "70%" }}></div>
              <div className="graph-dot" style={{ left: "90%" }}></div>
            </div>
          </div>
        </div>
        <div className="emoj">
          <h1 className="emk">🥰</h1>
          <h1 className="emk">🥹</h1>
          <h1 className="emk">😎</h1>
        </div>
      </div>
    </>
  );
}
