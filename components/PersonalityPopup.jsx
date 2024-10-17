// components/PersonalityPopup.js
"use client";
import React from "react";
import Button from "./Button";

const PersonalityPopup = ({ personality, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{ backgroundColor: "#fc46aa" }}>
        <h2
          style={{
            color: "#000",
            fontFamily: "sans serif",
            marginBottom: "10px",
            fontWeight: "Italic",
          }}
        >
          Your Personality
        </h2>
        <p
          style={{
            color: "aliceblue",
            fontWeight: "bold",
            fontFamily: "sans serif",
            marginBottom: "20px",
          }}
        >
          {personality}
        </p>
        <button onClick={onClose}>Close</button>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000; /* Ensure it's above other elements */
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          max-width: 400px; /* Optional: Limit the width of the popup */
          width: 90%; /* Responsive width */
        }
        button {
          margin-top: 10px;
          padding: 10px 20px;
          border: "1px solid #000";
          background-color: #fc4c4e;
          color: white;

          border-radius: 5px;
          cursor: pointer;
          font-weight: bold; /* Make the button text bold */
          transition: background-color 0.3s; /* Smooth transition for hover effect */
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default PersonalityPopup;
