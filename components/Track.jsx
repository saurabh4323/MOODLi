"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Track.css"; // Custom styling for the card
import "./Login.module.css";
export default function Track() {
  const [track, setTrack] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`/api/users/track/${userId}`);
          setTrack(response.data);
        } catch (error) {
          setError(error.response?.data?.message || "An error occurred");
        }
      }
    };
    fetchTrack();
  }, []);

  return (
    <div className="main">
      <div className="background-shapes"></div>
      <div className="background-shape"></div>
      <div className="background-shap"></div>
      <ul className="cards">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {Array.isArray(track) && track.length > 0 ? (
          track.map((entry) => (
            <li className="cards_item" key={entry._id}>
              <div className="card">
                <div className="card_image">
                  <span className="emoji">{entry.emoji}</span>
                </div>
                <div className="card_content">
                  <h2 className="card_title">
                    {new Date(entry.selectedAt).toLocaleDateString()}
                  </h2>
                  <p className="card_reason">{entry.reason}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <h1 className="erro">You haven't selected any emoji for track </h1>
        )}
      </ul>
    </div>
  );
}
