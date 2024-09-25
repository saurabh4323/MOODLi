import React, { useState, useEffect } from "react";
import "./MoodRecommendation.css";

const recommendations = {
  "😀": {
    mood: "Happy",
    songs: ["Happy - Pharrell Williams", "Uptown Funk - Bruno Mars"],
    books: ["The Happiness Project", "The Book of Joy"],
  },
  "😭": {
    mood: "Sad",
    songs: ["Someone Like You - Adele", "Let Her Go - Passenger"],
    books: ["The Fault in Our Stars", "A Little Life"],
  },
  "🥰": {
    mood: "Loved",
    songs: ["Perfect - Ed Sheeran", "Love Me Like You Do - Ellie Goulding"],
    books: ["Pride and Prejudice", "The Notebook"],
  },
  "😡": {
    mood: "Angry",
    songs: [
      "Break Stuff - Limp Bizkit",
      "Killing in the Name - Rage Against the Machine",
    ],
    books: ["The Count of Monte Cristo", "American Psycho"],
  },
  "😪": {
    mood: "Tired",
    songs: ["The Lazy Song - Bruno Mars", "Sleepyhead - Passion Pit"],
    books: ["Why We Sleep", "The Power of Now"],
  },
};

const MoodRecommendations = ({ selectedEmoji, showCard, onClose }) => {
  const { mood, songs, books } = recommendations[selectedEmoji] || {};

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
              {songs?.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </ul>
          </div>
          <div className="books-section">
            <h3>Books</h3>
            <ul>
              {books?.map((book, index) => (
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
