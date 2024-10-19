"use client";
import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import axios from "axios";
import "./emj.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const EmojiMoodTracker = () => {
  const [emojiData, setEmojiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmojiData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(`/api/users/track/${userId}`);
          setEmojiData(response.data);
        }
      } catch (err) {
        setError("Error fetching emoji data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmojiData();
  }, []);

  // Count occurrences of each emoji
  const emojiCount = emojiData.reduce((acc, entry) => {
    acc[entry.emoji] = (acc[entry.emoji] || 0) + 1;
    return acc;
  }, {});

  // Get the top 5 most used emojis
  const topEmojis = Object.entries(emojiCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Map emojis to mood scores
  const emojiMoodMap = {
    "😊": 1,
    "😍": 2,
    "🤩": 2,
    "💖": 1,
    "😟": -1,
    "😢": -2,
    "😭": -2,
    "😡": -2,
    "😕": -1,
    "😨": -2,
    "😴": 0,
    // Neutral or unclassified emojis can have 0
  };

  // Pie chart data
  const chartData = {
    labels: topEmojis.map(([emoji]) => emoji),
    datasets: [
      {
        label: "Emoji Usage",
        data: topEmojis.map(([, count]) => count),
        backgroundColor: [
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#ff9f40",
          "#4bc0c0",
        ],
      },
    ],
  };

  // Generate mood trends based on the emoji usage
  const moodTrendsData = {
    labels: emojiData.map((entry, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "Mood Trend",
        data: emojiData.map((entry) => emojiMoodMap[entry.emoji] || 0), // Map mood values
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  // Bar chart for positive vs. negative emoji usage
  const positiveNegativeData = {
    labels: ["Positive Emojis", "Negative Emojis"],
    datasets: [
      {
        label: "Frequency",
        data: [
          emojiData.filter((entry) =>
            ["😊", "😌", "💖", "😍"].includes(entry.emoji)
          ).length, // Positive
          emojiData.filter((entry) =>
            ["😟", "😨", "😭", "😢", "😕"].includes(entry.emoji)
          ).length, // Negative
        ],
        backgroundColor: ["#4bc0c0", "#ff6384"],
      },
    ],
  };

  // Generate a recommendation based on the top emoji
  const generateRecommendation = () => {
    const topEmoji = topEmojis[0] ? topEmojis[0][0] : "😊";
    let recommendation = "";

    switch (topEmoji) {
      case "😊":
        recommendation =
          "You're in a good mood! Keep spreading the positivity and enjoy your day! Maybe share a smile with someone else!";
        break;
      case "😴":
        recommendation =
          "You seem tired. It's important to recharge! Consider taking a nap or going to bed early tonight.";
        break;
      case "😡":
        recommendation =
          "Feeling angry? It's okay to feel that way. Try to channel that energy into something productive or engage in physical activity.";
        break;
      case "😲":
        recommendation =
          "Surprise can be thrilling! Embrace the unexpected and see where it takes you today.";
        break;
      case "😢":
        recommendation =
          "Sadness can be tough. Reach out to a friend or do something you enjoy to lift your spirits. Remember, it's okay to feel this way.";
        break;
      case "😎":
        recommendation =
          "You're feeling cool! Keep that confidence high and take on new challenges with style.";
        break;
      case "😟":
        recommendation =
          "Feeling worried? Take a deep breath. It might help to talk about your concerns or write them down.";
        break;
      case "😕":
        recommendation =
          "Confusion can be frustrating. Take a step back, simplify the situation, and try to gather more information.";
        break;
      case "🍔":
        recommendation =
          "You're feeling hungry! How about treating yourself to your favorite meal? Don't forget to enjoy it mindfully!";
        break;
      case "🤩":
        recommendation =
          "You're feeling excited! Use this energy to do something creative or try out a new hobby. The possibilities are endless!";
        break;
      case "😐":
        recommendation =
          "Boredom can be a signal for change. Try something new today—read a book, explore a hobby, or learn a new skill.";
        break;
      case "😌":
        recommendation =
          "You seem relaxed! Enjoy this moment of calm and consider sharing this peace with others.";
        break;
      case "💖":
        recommendation =
          "Feeling romantic? It's a great time to express your feelings to someone special or do something sweet for them.";
        break;
      case "😍":
        recommendation =
          "Love is in the air! Celebrate your feelings, whether it's through a kind gesture or a heartfelt message.";
        break;
      case "😨":
        recommendation =
          "Scared? Acknowledge your feelings and consider talking about your fears. Sometimes, sharing can lighten the load.";
        break;
      case "😭":
        recommendation =
          "Crying is a natural release of emotions. Allow yourself to feel and consider reaching out to a friend for support.";
        break;
      case "😪":
        recommendation =
          "Sleepy? Make sure you prioritize your rest. A good night's sleep is essential for mental clarity and energy.";
        break;
      case "😶":
        recommendation =
          "Feeling neutral? This is a good time for reflection. Think about what you want to do next or simply enjoy the moment.";
        break;
      case "😔":
        recommendation =
          "Depression can be overwhelming. It's important to seek help from friends, family, or a professional. You're not alone.";
        break;
      default:
        recommendation =
          "Monitor your mood and keep track of how you feel over time. Consider journaling or talking to someone if needed.";
    }

    return recommendation;
  };

  // List of stress & anxiety remedies
  const reminders = [
    "Take regular breaks to clear your mind.",
    "Try meditation or deep breathing exercises.",
    "Get some fresh air and go for a walk.",
    "Reach out to a friend or loved one if you're feeling overwhelmed.",
    "Stay hydrated and take care of your body.",
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="emoji-mood-tracker">
      <div className="emoji-content">
        <h1 className="emoji-title">Analyse Yourself</h1>

        {/* Emoji Pie Chart */}
        <div className="chart-container pie-chart">
          <Pie data={chartData} />
        </div>

        {/* Mood Trends (Line Chart) */}
        <div className="chart-container line-chart">
          <h2 className="emoji-subtitle">Overall Mood Trends</h2>
          <Line data={moodTrendsData} />
        </div>

        {/* Positive vs Negative Emojis (Bar Chart) */}
        <div className="chart-container bar-chart">
          <h2 className="emoji-subtitle">Positive vs. Negative days</h2>
          <Bar data={positiveNegativeData} />
        </div>

        {/* Personalized Recommendation */}
        <div className="recommendation-box">
          <h2 className="emoji-subtitle">Personalized Recommendation</h2>
          <p>{generateRecommendation()}</p>
        </div>

        {/* Stress & Anxiety Remedies */}
        <div className="remedies-box">
          <h2 className="emoji-subtitle">Remedies for Stress/Anxiety</h2>
          <ul>
            {reminders.map((reminder, index) => (
              <li key={index} className="reminder-item">
                {reminder}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmojiMoodTracker;
