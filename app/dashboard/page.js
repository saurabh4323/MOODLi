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
    switch (answer) {
      case "A":
        setPersonality("You believe most people genuinely want to do good.");
        break;
      case "B":
        setPersonality(
          "You think kindness creates a ripple effect of positivity."
        );
        break;
      case "C":
        setPersonality("You believe everyone has a story worth understanding.");
        break;
      case "D":
        setPersonality(
          "You think the goodness in people can lead to real change."
        );
        break;
      default:
        setPersonality("");
    }
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quiz", "done");
      localStorage.setItem("quizDate", new Date().toISOString().split("T")[0]); // Store current date
    }
    setShowPopup(false);
    setShowQuestion(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastQuizDate = localStorage.getItem("quizDate");
      const todayDate = new Date().toISOString().split("T")[0];
      if (lastQuizDate === todayDate) {
        setShowQuestion(false); // Hide the question if the quiz has already been taken today
      }
    }
  }, []);

  return (
    <div style={styles.container}>
      {showQuestion && (
        <div style={styles.questionContainer}>
          <h3 style={styles.question}>
            When reflecting on the world, you believe that:
          </h3>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={() => handleAnswer("A")}>
              A) Most people genuinely want to do good.
            </button>
            <button style={styles.button} onClick={() => handleAnswer("B")}>
              B) Kindness creates a ripple effect of positivity.
            </button>
            <button style={styles.button} onClick={() => handleAnswer("C")}>
              C) Everyone has a story worth understanding.
            </button>
            <button style={styles.button} onClick={() => handleAnswer("D")}>
              D) The goodness in people can lead to real change.
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <PersonalityPopup
          personality={personality}
          onClose={handleClosePopup}
        />
      )}

      {!showPopup && !showQuestion && <Dashboard />}
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
