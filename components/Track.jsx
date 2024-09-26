"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Track() {
  const [track, setTrack] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      const userId = localStorage.getItem("userId");
      console.log("User ID from localStorage:", userId);
      if (userId) {
        try {
          const response = await axios.get(`/api/users/track/${userId}`);
          console.log("API Response:", response.data);
          setTrack(response.data);
        } catch (error) {
          console.error("Error fetching track data:", error);
          setError(error.response?.data?.message || "An error occurred");
        }
      } else {
        setError("User ID not found in localStorage");
      }
    };
    fetchTrack();
  }, []);

  return (
    <div>
      <h1>Your mood this week</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {Array.isArray(track) && track.length > 0 ? (
          track.map((entry) => (
            <ul key={entry._id}>
              <li>{entry.emoji}</li>
              <li>{new Date(entry.selectedAt).toLocaleString()}</li>
              <li>{entry.reason}</li>{" "}
              {/* Displaying the reason for the emoji */}
            </ul>
          ))
        ) : (
          <p>No track data available.</p>
        )}
      </div>
    </div>
  );
}
