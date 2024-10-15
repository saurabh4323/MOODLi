"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Track.css"; // Custom styling for the card
import "./Login.module.css";
import Head from "next/head";

export default function Track() {
  const [track, setTrack] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const particleContainerRef = useRef(null); // Ref to manage the particle container

  // Array of predefined background colors
  const colors = ["#4267b2", "#ff4f52"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchTrack = async () => {
        const userId = localStorage.getItem("userId");
        if (userId) {
          try {
            setLoading(true); // Start loading
            const response = await axios.get(`/api/users/track/${userId}`);
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
      createParticles(); // Call the particle creation function

      // Cleanup function to remove particles on unmount
      return () => {
        if (particleContainerRef.current) {
          particleContainerRef.current.remove(); // Remove the particle container
        }
      };
    }
  }, []);

  // Function to create particles
  const createParticles = () => {
    const numParticles = 100; // Number of particles
    const particleContainer = document.createElement("div");
    particleContainer.className = "particle-container"; // Use this class for styling
    particleContainerRef.current = particleContainer; // Set ref to the particle container
    document.body.appendChild(particleContainer); // Append to body

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.width = `${Math.random() * 10 + 5}px`;
      particle.style.height = particle.style.width; // Keep it circular
      particle.style.backgroundColor = `rgba(0, 255, 255, ${Math.random()})`; // Random color with some transparency
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random animation duration
      particleContainer.appendChild(particle);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Tracking your data...</div>
        <div className="loading-spinner"></div> {/* Add loading animation */}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Moodli</title>
        <meta
          name="description"
          content="Welcome to Moodli, your mood-tracking community. Track your mood with emoji and join the community and chat with people. Get started now!"
        />
      </Head>
      <h1 className="text-4xl font-bold text-center mt-20 text-teal-700 dark:text-teal-300">
        Track Your Mood Over the Past 21 Days
      </h1>
      <div className="main">
        <ul className="cards">
          {Array.isArray(track) && track.length > 0 ? (
            track.map((entry, index) => (
              <li className="cards_item" key={entry._id}>
                <div
                  className="card"
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  <h2 className="card_title">
                    {new Date(entry.selectedAt).toLocaleDateString()}
                  </h2>
                  <div className="card_image">
                    <span className="emoji">{entry.emoji}</span>
                  </div>
                  <div className="card_content">
                    <p className="card_reason">{entry.reason}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <h1 className="erro">
              You have not selected any emoji for tracking
            </h1>
          )}
        </ul>
      </div>
    </>
  );
}
