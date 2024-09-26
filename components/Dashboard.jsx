"use client";
import React from "react";
import "./Dashboard.css";
import Calendar from "./Calander";

export default function Dashboard() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const status = {
    Days: 0,
    Time: new Date().toLocaleTimeString(),
    Date: new Date().toDateString(),
  };

  const mood = {
    Happy: "😊",

    Tired: "😴",
    Angry: "😡",
    Surprised: "😲",
    Sad: "😢",
    Cool: "😎",
    Worried: "😟",

    Confused: "😕",
  };

  // Define colors for each mood

  return (
    <div className="dashboard-container">
      <div className="backgroun-shapes"></div>
      <div className="backgroun-shape"></div>

      <div className="status-section">
        {Object.keys(status).map((key, index) => (
          <div key={index} className="status-item">
            <h1 className="status-text">
              {key}: {status[key]}
            </h1>
          </div>
        ))}
      </div>

      {/* Mood Display */}
      <div className="mood-heading">
        <h1>How&apos;s your mood shaping up today?</h1>
      </div>

      {/* Emoji Display */}
      <div className="emoji-section">
        {Object.keys(mood).map((key, index) => (
          <div key={index} className="emoji-card">
            <h1
              className="emoji-text"
              // Apply dynamic color here
            >
              {key}: {mood[key]}
            </h1>
          </div>
        ))}
      </div>
      <Calendar></Calendar>
    </div>
  );
}
