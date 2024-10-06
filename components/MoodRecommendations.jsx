import React, { useState, useEffect } from "react";
import "./MoodRecommendation.css";
import "../app/globals.css";
const recommendations = {
  "😀": {
    mood: "😀",
    songs: [
      {
        title: "Happy - Pharrell Williams",
        link: "https://www.youtube.com/watch?v=ZbZSe6N_BXs", // Updated link
      },
      {
        title: "Ilahi - Arijit Singh",
        link: "https://www.youtube.com/watch?v=6w67NOaRe-w", // Updated link
      },
    ],
    books: ["The Happiness Project", "Guide - R.K. Narayan"],
  },
  "😭": {
    mood: "😭",
    songs: [
      {
        title: "We don't talk anymore - Charlie",
        link: " https://www.youtube.com/watch?v=3AtDnEC4zak",
      },
      {
        title: "Alag Aasmaan - Anuv Jain",
        link: "https://www.youtube.com/watch?v=vA86QFrXoho", // Updated link
      },
    ],
    books: ["The Fault in Our Stars", "Aansu - Anuradha Karnik"],
  },
  "🥰": {
    mood: "🥰",
    songs: [
      {
        title: "Perfect - Ed Sheeran",
        link: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      },
      {
        title: "Tum Hi Ho - Arijit Singh",
        link: "https://www.youtube.com/watch?v=Umqb9KENgmk",
      },
    ],
    books: ["Pride and Prejudice", "When I Read - A.S. Byatt"],
  },
  "😡": {
    mood: "😡",
    songs: [
      {
        title: "Coldplay - Fix You",
        link: "https://www.youtube.com/watch?v=YykjpeuMNEk", // Corrected link
      },
      {
        title: "Kabira - Tochi Raina",
        link: "https://www.youtube.com/watch?v=lbCRtrrMvSw",
      },
    ],
    books: [
      "The Count of Monte Cristo",
      "Hazaron Khwahishen Aisi - Mirza Ghalib",
    ],
  },
  "😪": {
    mood: "😪",
    songs: [
      {
        title: "Ed Sheeran - Shape Of You",
        link: "https://www.youtube.com/watch?v=Vds8ddYXYZY",
      },
      {
        title: "Phir Se Udd Chala - Mohit Chauhan",
        link: "https://www.youtube.com/watch?v=2mWaqsC3U7k",
      },
    ],
    books: ["Why We Sleep", "Sochne Ke Liye - Jayanti Raghunath"],
  },
};

const MoodRecommendations = ({ selectedEmoji, showCard, onClose }) => {
  const { mood, songs, books } = recommendations[selectedEmoji] || {
    mood: "Unknown",
    songs: [],
    books: [],
  };

  return (
    <>
      {showCard && (
        <div className="recommendation-card animate-in">
          <div className="card-header">
            <h2 className="mood-title">Mood: {mood}</h2>
            <button className="close-btn" onClick={onClose}>
              ✖
            </button>
          </div>
          <div className="songs-section">
            <h3>Songs</h3>
            <ul>
              {songs.map((song) => (
                <li key={song.title}>
                  {song.title}
                  <iframe
                    width="200"
                    height="100"
                    src={`https://www.youtube.com/embed/${new URL(
                      song.link
                    ).searchParams.get("v")}`}
                    title={song.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() =>
                      console.error(`Failed to load video: ${song.title}`)
                    }
                  ></iframe>
                </li>
              ))}
            </ul>
          </div>
          <div className="books-section">
            <h3>Books</h3>
            <ul>
              {books.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default MoodRecommendations;
