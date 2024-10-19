"use client";
import React, { useEffect, useState } from "react";
import "../globals.css";
import Dashboard from "@/components/Dashboard";
import PersonalityPopup from "@/components/PersonalityPopup";

export default function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const [personality, setPersonality] = useState("");
  const [showQuestion, setShowQuestion] = useState(true);

  const handleAnswer = (answer) => {
    let message = "";
    switch (answer) {
      case "A":
        message =
          "You approach challenges with optimism, always believing that things will work out. This can help you overcome obstacles and inspire others to stay positive.";
        break;
      case "B":
        message =
          "You're a practical thinker who prefers to weigh pros and cons before making decisions. This level-headedness can help you navigate complex situations with clarity.";
        break;
      case "C":
        message =
          "You trust your intuition and rely on your gut feelings when faced with uncertainty. Your ability to tune into your inner voice helps guide you in the right direction.";
        break;
      case "D":
        message =
          "You thrive in structured environments where plans and details are laid out. This helps you stay organized and accomplish your goals effectively.";
        break;
      default:
        message =
          "Your insights matter, and reflecting on them is the first step toward personal growth.";
    }
    setPersonality(message);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quiz", "done");
      localStorage.setItem("quizDate", new Date().toISOString().split("T")[0]);
    }
    setShowPopup(false);
    setShowQuestion(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastQuizDate = localStorage.getItem("quizDate");
      const todayDate = new Date().toISOString().split("T")[0];
      if (lastQuizDate === todayDate) {
        setShowQuestion(false);
      }
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* {showQuestion && (
        <div style={styles.questionContainer}>
          <h3 style={styles.question}>
            When faced with an unexpected challenge, how do you usually respond?
          </h3>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={() => handleAnswer("A")}>
              A) I stay positive and believe things will work out.
            </button>
            <button style={styles.button} onClick={() => handleAnswer("B")}>
              B) I analyze the situation and make a plan.
            </button>
            <button style={styles.button} onClick={() => handleAnswer("C")}>
              C) I trust my instincts and follow my gut feelings.
            </button>
            <button style={styles.button} onClick={() => handleAnswer("D")}>
              D) I organize my thoughts and create a step-by-step solution.
            </button>
          </div>
        </div>
      )} */}

      {/* {showPopup && (
        <PersonalityPopup
          personality={personality}
          onClose={handleClosePopup}
        />
      )} */}

      {/* {!showPopup && !showQuestion && <Dashboard />} */}
      <Dashboard></Dashboard>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  questionContainer: {
    border: "1px solid #fff",
    backgroundColor: "#720ef6",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    marginBottom: "20px",
  },
  question: {
    fontFamily: "'Roboto', sans-serif",
    marginBottom: "15px",
    fontWeight: "Bold",
    fontSize: "1.2em",
    color: "aliceblue",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    textAlign: "left",
    padding: "10px",
    border: "1px solid #fff",
    backgroundColor: "#3d0b81",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
    transition: "background-color 0.3s",
  },
};
