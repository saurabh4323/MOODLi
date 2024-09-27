"use client";
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Calendar from "./Calander";
import axios from "axios";
import Button from "./Button";

export default function Dashboard() {
  const [clicked, setClicked] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [days, setDays] = useState(0); // Move Days to state
  const userId = localStorage.getItem("userId");

  const [emojidata, setEmojidata] = useState({
    emoji: "",
    days: 1, // Default value for days
    reason: "",
  });

  useEffect(() => {
    const lastSubmissionDate = localStorage.getItem("lastSubmissionDate");
    const today = new Date().toLocaleDateString();

    if (lastSubmissionDate === today) {
      setHasSubmittedToday(true);
    }
  }, []);

  const emojiselect = (emoji) => {
    setSelectedEmoji(emoji);
    setClicked(true);
    setEmojidata((prevData) => ({
      ...prevData,
      emoji,
      days: 1,
    }));
  };

  const handleInputChange = (event) => {
    setEmojidata({ ...emojidata, [event.target.name]: event.target.value });
  };

  const closeclicked = () => {
    setClicked(false);
  };

  const handlesubmit = async () => {
    if (hasSubmittedToday) {
      alert("You have already submitted your mood for today.");
      return;
    }

    if (!selectedEmoji || !emojidata.reason) {
      alert("Please select an emoji and provide a reason.");
      return;
    }

    try {
      const response = await axios.post(`/api/users/tracker/${userId}`, {
        userId,
        days: emojidata.days || 1,
        emoji: selectedEmoji,
        reason: emojidata.reason,
      });

      const today = new Date().toLocaleDateString();
      localStorage.setItem("lastSubmissionDate", today);

      // Update state after submission
      setDays((prevDays) => prevDays + 1);

      setEmojidata({
        emoji: "",
        days: 1,
        reason: "",
      });
      setHasSubmittedToday(true);
      setClicked(false);

      alert("Submission successful!");
    } catch (error) {
      console.error("Error submitting emoji report:", error);
      alert("You are not registered. Please try again.");
    }
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

  return (
    <div className="dashboard-container">
      <div className="backgroun-shapes"></div>
      <div className="backgroun-shape"></div>

      <div className="status-section">
        <div className="status-item">
          <h1 className="status-text">Days: {days}</h1>
        </div>
        <div className="status-item">
          <h1 className="status-text">
            Time: {new Date().toLocaleTimeString()}
          </h1>
        </div>
        <div className="status-item">
          <h1 className="status-text">Date: {new Date().toDateString()}</h1>
        </div>
      </div>

      <div className="mood-heading">
        <h1>How&apos;s your mood shaping up today?</h1>
      </div>

      {clicked && (
        <div className="animated-cardclick">
          <input
            type="text"
            placeholder="Write the reason for mood"
            name="reason"
            value={emojidata.reason}
            onChange={handleInputChange}
            className="reason-input"
          />
          <div className="button-containerclick">
            <button className="button" onClick={closeclicked}>
              Close
            </button>
            <button
              className="button submit-button"
              type="submit"
              onClick={handlesubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="emoji-section">
        {Object.keys(mood).map((key, index) => (
          <div key={index} className="emoji-card">
            <h1 className="emoji-text" onClick={() => emojiselect(mood[key])}>
              {key}: {mood[key]}
            </h1>
          </div>
        ))}
      </div>

      <Calendar />
    </div>
  );
}
