"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegComment } from "react-icons/fa"; // Icons for like and comment
import { Heart, MessageCircle } from "lucide-react";
import "./style.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/post/gettingall", {
        headers: {
          "Cache-Control": "no-cache", // Prevent caching
        },
      });
      setPosts(response.data.post);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  // Fetch profiles
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("/api/users/sau"); // Adjust the URL based on your API
      setProfiles(response.data); // Assuming response contains profile data
    } catch (error) {
      console.error("Error fetching profiles", error);
    }
  };

  // Find profile data by userId
  const getProfileById = (userId) => {
    return profiles.find((profile) => profile.userId === userId);
  };

  useEffect(() => {
    fetchPosts();
    fetchProfiles();
  }, []);

  return (
    <div className="post-list-container">
      {posts.map((post) => {
        const profile = getProfileById(post.userId); // Get profile for the userId

        return (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <div className="user-info">
                <h4 className="usernamek" style={{ color: "#fff" }}>
                  {profile?.name || "Unknown User"}
                </h4>{" "}
                <span className="timestamp">
                  {post.timestamp
                    ? new Date(post.timestamp).toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>
            </div>

            {/* Post Content */}
            <div className="post-content">
              <p>{post.content}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post Content"
                  className="post-image"
                />
              )}
            </div>

            {/* Post Actions: Like and Comment */}
            <div className="post-actions" style={{ color: "white" }}>
              <button
                className="action-button"
                onClick={() => handleLike(post._id)}
              >
                <Heart color="#fff" className="icon" />
                <span style={{ color: "#fff" }}>({post.likes.length})</span>
              </button>
              <button className="action-button">
                <MessageCircle color="#ffffff" className="icon" />{" "}
                <span style={{ color: "#fff" }}>comment</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
