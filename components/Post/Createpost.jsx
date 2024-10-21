"use client";
import React, { useState } from "react";
import axios from "axios";
import "./style.css";

export default function Createpost({ fetchPosts }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await axios.post("/api/post/posting", {
        userId: userId,
        type: imageUrl ? "image" : "text",
        content,
        imageUrl,
      });
      fetchPosts(); // Re-fetch posts after creating
      setContent("");
      setImageUrl("");
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <div className="create-post">
      <button
        className="buttonp "
        onClick={() =>
          (document.getElementById("postModal").style.display = "block")
        }
      >
        Create Post
      </button>

      <div id="postModal" className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() =>
              (document.getElementById("postModal").style.display = "none")
            }
          >
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button className="buttonp " type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
