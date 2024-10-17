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
          "You value empathy and connection with others. Fostering these relationships can bring you happiness and fulfillment. Consider finding ways to deepen your connections.";
        break;
      case "B":
        message =
          "Your belief in the power of kindness suggests that you might thrive in environments where positivity and support are prevalent. Seek out communities that uplift you.";
        break;
      case "C":
        message =
          "You have a deep understanding of people's stories and struggles, which can be a source of strength. Engage with others to share experiences and learn more.";
        break;
      case "D":
        message =
          "You believe in the potential for good in humanity. This perspective can inspire you to create positive change. Explore avenues where you can contribute to a better world.";
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
            Reflecting on your interactions with others, how would you describe
            your belief about human nature?
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
