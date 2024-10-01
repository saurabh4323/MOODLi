"use client";
import { useState, useEffect, useRef } from "react";
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
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
  };

  const startCamera = () => {
    setShowCamera(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const imageData = canvasRef.current.toDataURL("image/png");
    setPhoto(imageData);
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Stop camera
    setShowCamera(false); // Hide camera after taking a photo
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
        <h1>How's your mood shaping up today?</h1>
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

          {showCamera ? (
            <>
              <video ref={videoRef} width="320" height="240"></video>
              <button className="button" onClick={takePhoto}>
                Capture Selfie
              </button>
            </>
          ) : (
            <>
              {photo && (
                <img style={{ transform: "none" }} src={photo} alt="Captured" />
              )}
              <button className="button" onClick={startCamera}>
                Take a Selfie
              </button>
            </>
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

      {/* Hidden canvas for capturing the photo */}
      <canvas
        ref={canvasRef}
        width="320"
        height="240"
        style={{ display: "none" }}
      ></canvas>
    </div>
  );
}
