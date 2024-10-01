"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Track.css"; // Custom styling for the card
import "./Login.module.css";

export default function Track() {
  const [track, setTrack] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);

  // Array of predefined background colors
  const colors = [
    "#9be6c1",
    "#ffb1cc",
    "#9bc9ff",
    "#ffecb3",
    "#b39ddb",
    "#f2c94c",
    "#ffa726",
    "#81d4fa",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchTrack = async () => {
        const userId = localStorage.getItem("userId");
        if (userId) {
          try {
            setLoading(true); // Start loading
            const response = await axios.get(`/api/users/track/${userId}`);
            console.log("API Response: ", response.data); // Log the API response
            setTrack(response.data);
            setLoading(false); // Stop loading
          } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
            setLoading(false); // Stop loading
          }
        } else {
          setError("User ID not found. Please log in.");
          setLoading(false); // Stop loading
        }
      };

      fetchTrack();
    }
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Tracking your data...</div>
        <div className="loading-spinner"></div> {/* Add loading animation */}
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Display error if any
  }

  return (
    <div className="main">
      <div className="background-shapes"></div>
      <div className="background-shape"></div>
      <div className="background-shap"></div>
      <ul className="cards">
        {Array.isArray(track) && track.length > 0 ? (
          track.map((entry, index) => (
            <li className="cards_item" key={entry._id}>
              <div
                className="card"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <div className="card_image">
                  {/* Display emoji or fallback if missing */}
                  <span className="emoji">
                    {entry.emoji ? entry.emoji : "😊"}
                  </span>
                </div>
                <div className="card_content">
                  {/* Ensure the date and reason are displayed properly */}
                  {entry.selectedAt && (
                    <h2 className="card_title">
                      {new Date(entry.selectedAt).toLocaleDateString()}
                    </h2>
                  )}
                  {entry.reason && (
                    <p className="card_reason">{entry.reason}</p>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <h1 className="erro">You have not selected any emoji for track</h1>
        )}
      </ul>
    </div>
  );
}
