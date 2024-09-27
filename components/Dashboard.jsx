"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "./Calander";
import "./Dashboard.css";

export default function Dashboard() {
  const [track, setTrack] = useState([]);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [days, setDays] = useState(0); // Initialize with 0

  const [emojidata, setEmojidata] = useState({
    emoji: "",
    days: 1,
    reason: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Accessing localStorage client-side
      const userId = localStorage.getItem("userId");
      if (userId) {
        const fetchTrack = async () => {
          try {
            const response = await axios.get(`/api/users/track/${userId}`);
            setTrack(response.data);
          } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
          }
        };
        fetchTrack();
      }

      // Retrieve days count from localStorage if available
      const storedDays = localStorage.getItem("days");
      if (storedDays) {
        setDays(parseInt(storedDays, 10)); // Convert string to integer
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for last submission date only client-side
      const lastSubmissionDate = localStorage.getItem("lastSubmissionDate");
      const today = new Date().toLocaleDateString();

      if (lastSubmissionDate === today) {
        setHasSubmittedToday(true);
      }
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

    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("You are not registered. Please try again.");
        return;
      }

      try {
        await axios.post(`/api/users/tracker/${userId}`, {
          userId,
          days: emojidata.days || 1,
          emoji: selectedEmoji,
          reason: emojidata.reason,
        });

        const today = new Date().toLocaleDateString();
        localStorage.setItem("lastSubmissionDate", today);

        // Update the day count after submission
        const newDays = days + 1;
        setDays(newDays);

        // Save updated days count to localStorage
        localStorage.setItem("days", newDays);

        // Reset state after submission
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
    Hungry: "🍔",
    Excited: "🤩",
    Bored: "😐",
    Relaxed: "😌",
    Romantic: "💖",
    Love: "😍",
    Scared: "😨",

    Crying: "😭",

    Sleepy: "😪",

    Neutral: "😶",
    Party: "🥳",

    Flirty: "😏",
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
