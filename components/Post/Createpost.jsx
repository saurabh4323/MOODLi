"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./post.css";
import { X } from "lucide-react";

export default function Createpost({ fetchPosts }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content && !imageUrl) {
      setError("Please add some content or an image.");
      return;
    }

    setIsLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      const type = imageUrl ? "image" : "text"; // Define type outside the object

      await axios.post("/api/post/posting", {
        userId, // Pass userId
        type, // Pass type
        content, // Pass content
        imageUrl, // Pass imageUrl
      });

      // fetchPosts();
      setContent("");
      setImageUrl("");
      setImageName(""); // Reset image name
      toggleModal();
    } catch (error) {
      // Log the error for debugging
      console.error("Error creating post", error);
      setError("Error creating post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post">
      <div className="buttonp" onClick={toggleModal}>
        Create Post
      </div>

      {isModalOpen && (
        <div className="modals">
          <div className="modals-content">
            <span className="close" onClick={toggleModal}>
              <X color="#ffffff" />
            </span>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea"
                aria-label="Post content"
                required
              />
              <input
                placeholder="Upload an image (optional)"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImageUrl(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setImageName(file.name); // Set the image name
                  }
                }}
                className="input-text"
                aria-label="Upload Image"
              />
              {imageName && (
                <p className="image-name">Uploaded Image: {imageName}</p>
              )}{" "}
              {/* Display the image name */}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded preview"
                  className="image-preview"
                />
              )}{" "}
              {/* Display the image preview */}
              {error && <p className="error-message">{error}</p>}
              <div
                className={`buttonp ${isLoading ? "button-loading" : ""}`}
                role="button"
                onClick={handleSubmit}
              >
                {isLoading ? "Posting..." : "Post"}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
