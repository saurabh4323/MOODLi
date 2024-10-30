"use client";
import React, { useState, useEffect } from "react";
import "../profile.css";
import axios from "axios";
import "../comm.css";
import Button from "../Button";
import { Flame } from "lucide-react";
export default function Location({ onNearbyUsersFetched }) {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [distance, setDistance] = useState(100); // Default distance in kilometers
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error("Error fetching location:", error)
    );
  }, []);

  useEffect(() => {
    const usid = localStorage.getItem("userId");
    setUserId(usid);
  }, []);

  const fetchNearbyUsers = async () => {
    if (!location.latitude || !location.longitude) return;

    try {
      const response = await axios.get(`/api/location`, {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          distance,
        },
      });
      setNearbyUsers(response.data);
      console.log(response.data);
      // After fetching nearby users, fetch their profiles
      fetchUserProfiles(response.data.map((user) => user.userId));
      // Call the parent callback with the nearby users
      onNearbyUsersFetched(response.data);
    } catch (error) {
      console.error("Error fetching nearby users:", error);
    }
  };

  const fetchUserProfiles = async (userIds) => {
    try {
      const response = await axios.get("/api/users/sau");
      const profiles = response.data.filter((profile) =>
        userIds.includes(profile.userId)
      );
      setUserProfiles(profiles);
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    }
  };

  const saveLocation = async () => {
    if (!location.latitude || !location.longitude) {
      console.error("Location coordinates are missing");
      return;
    }
    try {
      await axios.post("/api/location", {
        userId,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      console.log("Location saved");
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };
  const colors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#F9A8D4",
    "#FDBA74",
    "#FB7185",
    "#A3E635",
    "#FACC15",
    "#86EFAC",
    "#C084FC",
    "#FECACA",
    "#FF9AA2",
  ];
  const truncateBio = (bio) =>
    bio.length > 25 ? ` ${bio.substring(0, 25)}... ` : bio;

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className="">
      {/* Distance Slider */}
      <div className="">
        <label htmlFor="distanceRange" style={{ marginBottom: "20px" }}>
          Distance: {distance} km
        </label>
        <input
          type="range"
          id="distanceRange"
          min="10"
          max="500"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>

      {/* Fetch Users Button */}
      <div
        className="bns"
        style={{ display: "flex", gap: "10px", marginTop: "20px" }}
      >
        {" "}
        <button onClick={fetchNearbyUsers} className="button">
          Show Nearby
        </button>
        {/* Save Location Button */}
        <button onClick={saveLocation} className="button">
          Save My
        </button>
      </div>
      {/* Display Nearby User Profiles */}
      <div className="cards-container" style={{ marginTop: "20px" }}>
        {userProfiles.length > 0 ? (
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: "40px",
              justifyContent: "space-evenly",
            }}
          >
            {userProfiles.map((profile) => (
              <li
                style={{ backgroundColor: getRandomColor() }}
                key={profile.userId}
                className="user-card"
              >
                <h2
                  onClick={() => {
                    window.location.href = `/viewing/${profile.userId}`;
                  }}
                  className="user-name"
                >
                  {profile.name}
                </h2>
                <p className="user-emoji">{profile.favoriteEmoji}</p>
                <p style={{ fontSize: "16px" }} className="user-io">
                  {truncateBio(profile.bio)}
                </p>
                <p
                  // onClick={() => sendto(user)}
                  className="user-biom"
                  style={{ marginBottom: "-15px" }}
                >
                  {profile.gender === "Male" ? (
                    <Flame color="#FF0000" />
                  ) : (
                    <Flower color="aliceblue" />
                  )}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
