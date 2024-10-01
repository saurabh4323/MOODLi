"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "./Calander";
import "./Dashboard.css";

export default function Dashboard() {
  const [clicked, setClicked] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [days, setDays] = useState(0);
  const [emojidata, setEmojidata] = useState({
    emoji: "",
    days: 1,
    reason: "",
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`/api/users/days/${userId}`);
          setDays(response.data.days);
        } catch (error) {
          console.error("Error fetching days:", error);
        }
      }
    };
    fetchTrack();
  }, []);

  useEffect(() => {
    const lastSubmissionDate = localStorage.getItem("lastSubmissionDate");
    const today = new Date().toLocaleDateString();
    setHasSubmittedToday(lastSubmissionDate === today);
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
    setPhoto(null); // Reset photo on close
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Set the base64 image data
      };
      reader.readAsDataURL(file);
    }
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
        photo: photo, // Send photo data with the submission
      });

      const newDays = days + 1;
      await axios.post(`/api/users/days/${userId}`, { days: 1 });
      setDays(newDays);
      localStorage.setItem(
        "lastSubmissionDate",
        new Date().toLocaleDateString()
      );
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
      <div className="status-section">
        <div className="status-item">
          <h1 className="status-text">Days: {days} 🌟</h1>
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

          <label
            className="custom-file-upload"
            style={{ color: "blue", fontSize: "12px" }}
          >
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            Send Selfie
          </label>

          {photo && (
            <img
              src={photo}
              alt="Uploaded"
              width="320"
              height="240"
              style={{ border: "1px solid #000" }}
            />
          )}

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
