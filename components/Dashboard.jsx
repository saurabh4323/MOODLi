"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Calendar from "./Calander";
// import getRandomColor from "./getRandomColor.js";
import "./Dashboard.css";
import "./Track.css";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the toasts
import Feedback from "./Feedback";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [clicked, setClicked] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [days, setDays] = useState(0);
  const [emojiData, setEmojiData] = useState({
    emoji: "",
    days: 1,
    reason: "",
    image: "",
  });
  const [photo, setPhoto] = useState(null);
  const [emojiMap, setEmojiMap] = useState({}); // New state to track emojis by date
  const colors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#F9A8D4",
    "#FDBA74",
    "#6EE7B7",
    "#93C5FD",
    "#D8B4FE",
    "#E879F9",
    "#FCD34D",
    "#38BDF8",
    "#FB7185",
    "#A3E635",
    "#FACC15",
    "#86EFAC",
    "#C084FC",
    "#FECACA",
    "#FF9AA2",
    "#FFB3E6",
    "#FF6666",
    "#FFB347",
    "#D3C0FB",
    "#FFC3A0",
    "#FF677D",
    "#D4A5A5",
    "#392F5A",
    "#D9BF77",
  ];

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
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

  const emojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setClicked(true);
    setEmojiData((prevData) => ({
      ...prevData,
      emoji,
      days: 1,
    }));
  };

  const handleInputChange = (event) => {
    setEmojiData({ ...emojiData, [event.target.name]: event.target.value });
  };

  const closeClicked = () => {
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.post("/api/users/sau", { userId });
          setUsername(response.data.name);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Main part to post on emoji
  const handleSubmit = async () => {
    if (hasSubmittedToday) {
      toast.error("You have already submitted your mood for today."); // Replace alert with toast
      return;
    }

    if (!selectedEmoji || !emojiData.reason) {
      toast.error("Please select an emoji and provide a reason."); // Replace alert with toast
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error(
        "You are not registered / not created profile. Please try again."
      ); // Replace alert with toast
      return;
    }

    try {
      setClicked(false);
      await axios.post(`/api/users/tracker/${userId}`, {
        userId,
        days: days,
        emoji: selectedEmoji,
        reason: emojiData.reason,
        name: username,
      });

      const newDays = days + 1;
      await axios.post(`/api/users/days/${userId}`, { days: 1 });
      setDays(newDays);

      // Update emoji map with the current date and selected emoji
      const todayDate = new Date().toLocaleDateString();
      setEmojiMap((prevMap) => ({
        ...prevMap,
        [todayDate]: selectedEmoji, // Store the emoji for today's date
      }));

      localStorage.setItem("lastSubmissionDate", todayDate);
      setHasSubmittedToday(true);

      toast.success("Submission successful!"); // Replace alert with toast
    } catch (error) {
      console.error("Error submitting emoji report:", error);
      toast.error("You are not registered. Please try again."); // Replace alert with toast
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
      <ToastContainer /> {/* Add the ToastContainer component */}
      <div className="status-section">
        <div className="status-item">
          <h1 className="status-text">Days: {days} 🌟</h1>
        </div>
        {/* <Feedback></Feedback> */}
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
          <h2 className="name-display">
            Hey {username}, today you are feeling
          </h2>{" "}
          <div className="emoji-display">{selectedEmoji}</div>{" "}
          <input
            type="text"
            placeholder="Reason for your mood"
            name="reason"
            value={emojiData.reason}
            onChange={handleInputChange}
            className="reason-input"
          />
          <div className="button-container">
            <button
              className="button close-button"
              onClick={closeClicked}
              style={{ marginRight: "10px" }}
            >
              Close
            </button>
            <button className="button submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="emoji-section">
        {Object.keys(mood).map((key, index) => (
          <div
            key={index}
            className="emoji-card"
            style={{
              backgroundColor: getRandomColor(),
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "200px", // Square size
              height: "180px",
              margin: "15px",
            }}
            onClick={() => emojiSelect(mood[key])}
          >
            <span style={{ fontSize: "55px" }}>{mood[key]}</span> {/* Emoji */}
            <span
              style={{ fontSize: "20px", color: "#f5f5f5", fontWeight: "bold" }}
            >
              {key}
            </span>{" "}
            {/* Emoji Name */}
          </div>
        ))}
      </div>
      <Calendar emojiMap={emojiMap} />{" "}
    </div>
  );
}
