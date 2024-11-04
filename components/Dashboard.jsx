"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Calendar from "./Calander";
import "./Dashboard.css";
import styles from "./Heros.module.css";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import Head from "next/head";
import { ShareIcon } from "lucide-react";
export default function Dashboard() {
  const route = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
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
  const [emojiMap, setEmojiMap] = useState({});
  const particleContainerRef = useRef(null);

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

  const createParticles = () => {
    const numParticles = 100;
    const particleContainer = document.createElement("div");
    particleContainer.className = "particle-containers";
    particleContainerRef.current = particleContainer;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < numParticles; i++) {
      const square = document.createElement("div");
      square.className = "square";
      square.style.backgroundColor = getRandomColor();
      square.style.width = `${Math.random() * 15 + 10}px`;
      square.style.height = square.style.width;
      square.style.left = `${Math.random() * 100}vw`;
      square.style.top = `${Math.random() * 100}vh`;
      square.style.animationDuration = `${Math.random() * 3 + 2}s`;
      particleContainer.appendChild(square);
    }
  };

  useEffect(() => {
    createParticles();

    return () => {
      if (particleContainerRef.current) {
        particleContainerRef.current.remove();
      }
    };
  }, [createParticles]);

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
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      } else {
        setLoading(false); // Set loading to false if userId is not found
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  // Main part to post on emoji
  const handleSubmit = async () => {
    if (hasSubmittedToday) {
      toast.error("You have already submitted your mood for today."); // Use toast.error
      return;
    }

    if (!selectedEmoji) {
      toast.error("Please select an emoji and provide a reason."); // Use toast.error
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("You are not registered. Please try again."); // Use toast.error
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
      toast.success("Submission successful!");

      const newDays = days + 1;
      await axios.post(`/api/users/days/${userId}`, { days: 1 });
      setDays(newDays);

      const todayDate = new Date().toLocaleDateString();
      setEmojiMap((prevMap) => ({
        ...prevMap,
        [todayDate]: selectedEmoji,
      }));

      localStorage.setItem("lastSubmissionDate", todayDate);
      setHasSubmittedToday(true);
    } catch (error) {
      console.error("Error submitting emoji report:", error);
      toast.error(
        "You have not created profile or not registered. Please try again."
      ); // Use toast.error
    }
  };

  const emojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setClicked(true);
  };

  const handleInputChange = (e) => {
    setEmojiData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const closeClicked = () => {
    setClicked(false);
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

  const chrt = () => {
    route.push("/chart");
  };
  const handleSharePost = async () => {
    if (hasSubmittedToday) {
      toast.error("You have already submitted your mood for today."); // Use toast.error
      return;
    }

    if (!selectedEmoji || !emojiData.reason) {
      toast.error("Please select an emoji and  and provide a reason."); // Use toast.error
      return;
    }
    const userId = localStorage.getItem("userId");
    try {
      setClicked(false);
      await axios.post(`/api/post/posting`, {
        userId,
        type: "text",
        content: `Mood: ${selectedEmoji}\nReason: ${emojiData.reason}`,

        imageUrl: "",
      });

      toast.success("shared as post!");
    } catch (error) {
      console.log("Error sharing post:", error);
      toast.error(" Please try again.");
    }
  };
  return (
    <div className="dashboard-container">
      <Toaster /> {/* Ensure the Toaster component is rendered */}
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
        <button className={styles.button} onClick={chrt}>
          Analyse Yourself
        </button>
      </div>
      {clicked && (
        <div className="animated-cardclick">
          <h2 className="name-display">
            Hey {username}, today you are feeling
          </h2>
          <div className="emoji-display">{selectedEmoji}</div>
          <input
            type="text"
            placeholder="Reason (optional)"
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
            <button
              className="button close-button"
              onClick={handleSharePost}
              style={{
                marginRight: "10px",
                backgroundColor: "#0288d1",
              }}
            >
              share
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
              width: "200px",
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
