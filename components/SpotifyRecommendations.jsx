import React, { useEffect, useState } from "react";
import "./spotifyrec.css";

const token = "YOUR_SPOTIFY_API_TOKEN"; // Replace with your actual token

async function fetchWebApi(endpoint, method) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
  });
  return await res.json();
}

const emojiGenreMap = {
  "😊": "pop",
  "😢": "sad",
  "🎸": "rock",
  "🎧": "electronic",
  "💖": "romantic",
};

async function getSongRecommendations(emoji) {
  const genre = emojiGenreMap[emoji];
  if (!genre) return [];

  return (
    await fetchWebApi(`v1/recommendations?seed_genres=${genre}&limit=5`, "GET")
  ).tracks;
}

const SpotifyRecommendations = ({ selectedEmoji, showCard, onClose }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      if (showCard) {
        const recommendations = await getSongRecommendations(selectedEmoji);
        setSongs(recommendations);
      }
    };

    fetchSongs();
  }, [selectedEmoji, showCard]);

  return (
    <>
      {showCard && (
        <div className="recommendation-card animate-in spotify-card">
          <div className="card-header">
            <h2 className="mood-title">Spotify Recommendations</h2>
            <button className="close-btn" onClick={onClose}>
              ✖
            </button>
          </div>
          <div className="songs-section">
            <h3>Recommended Songs</h3>
            <ul>
              {songs.map((song) => (
                <li key={song.id}>
                  <a
                    href={song.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {song.name} by{" "}
                    {song.artists.map((artist) => artist.name).join(", ")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SpotifyRecommendations;
