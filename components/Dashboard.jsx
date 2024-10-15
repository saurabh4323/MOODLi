"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
// Import CSS for the toasts
import Calendar from "./Calander"; // Assuming the Calendar component is correct
import "./Dashboard.css"; // Existing styles

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
  const [emojiMap, setEmojiMap] = useState({}); // State to track emojis by date
  const particleContainerRef = useRef(null); // Ref for the particle container

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

  // Function to create particles
  const createParticles = () => {
    const numParticles = 100; // Number of particles
    const particleContainer = document.createElement("div");
    particleContainer.className = "particle-containers"; // Use this class for styling
    particleContainerRef.current = particleContainer; // Set ref to the particle container
    document.body.appendChild(particleContainer); // Append to body

    for (let i = 0; i < numParticles; i++) {
      const square = document.createElement("div");
      square.className = "square";
      square.style.backgroundColor = getRandomColor(); // Set random color
      square.style.width = `${Math.random() * 15 + 10}px`; // Random width
      square.style.height = square.style.width; // Keep it square
      square.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      square.style.top = `${Math.random() * 100}vh`; // Random vertical position
      square.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random animation duration
      particleContainer.appendChild(square);
    }
  };

  useEffect(() => {
    createParticles(); // Call to create particles on component mount

    // Cleanup function to remove particles on unmount
    return () => {
      if (particleContainerRef.current) {
        particleContainerRef.current.remove(); // Remove the particle container
      }
    };
  }, []);

  // Fetch user profile
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
      toast.error("You have already submitted your mood for today.");
      return;
    }

    if (!selectedEmoji || !emojiData.reason) {
      toast.error("Please select an emoji and provide a reason.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("You are not registered. Please try again.");
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
        [todayDate]: selectedEmoji,
      }));

      localStorage.setItem("lastSubmissionDate", todayDate);
      setHasSubmittedToday(true);

      toast.success("Submission successful!");
    } catch (error) {
      console.error("Error submitting emoji report:", error);
      toast.error("There was an issue. Please try again.");
    }
  };

  // Function to handle emoji selection
  const emojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setClicked(true); // Show the reason input form when an emoji is clicked
  };

  // Function to handle input field changes
  const handleInputChange = (e) => {
    setEmojiData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Close the emoji card
  const closeClicked = () => {
    setClicked(false); // Close the form
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
    Depressed: "😔",
    Flirty: "😏",
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />
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
          <h2 className="name-display">
            Hey {username}, today you are feeling
          </h2>
          <div className="emoji-display">{selectedEmoji}</div>
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
            <span style={{ fontSize: "55px" }}>{mood[key]}</span>
            <span
              style={{ fontSize: "20px", color: "#f5f5f5", fontWeight: "bold" }}
            >
              {key}
            </span>
          </div>
        ))}
      </div>
      <Calendar emojiMap={emojiMap} />
    </div>
  );
}
