"use client";
import React, { useState } from "react";
import axios from "axios";
import "./post.css";
import { X } from "lucide-react";

export default function CreatePost({ fetchPosts }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(""); // State for caption

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate input: either content or image file must be present
    if (!content && !file) {
      setError("Please add some content or an image.");
      return;
    }

    setIsLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      const type = file ? "image" : "text";

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("type", type);
      formData.append("caption", caption || content); // Use caption for images, or content for text posts

      if (file) {
        formData.append("image", file); // Ensure the image file is appended
      }

      // Make sure to point to the correct endpoint for image upload
      const endpoint =
        type === "image" ? "/api/imageupload" : "/api/post/posting";

      // Post the FormData to the appropriate endpoint
      await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset state and close the modal after posting
      setContent("");
      setImageUrl("");
      setImageName("");
      setFile(null);
      setCaption("");
      toggleModal();
      alert(
        "Thank you for sharing! We will check the content with our rules and privacy policy before showing it to users."
      );
    } catch (error) {
      console.error("Error creating post", error);
      setError("Error creating post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post">
      <div className="buttonp" onClick={toggleModal}>
        Create
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
                required={!file} // Require content if no image is uploaded
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setFile(selectedFile); // Store the image file in state
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImageUrl(reader.result);
                    };
                    reader.readAsDataURL(selectedFile);
                    setImageName(selectedFile.name); // Set the image name
                  }
                }}
                className="input-text"
                aria-label="Upload Image"
              />

              {imageName && (
                <p className="image-name">Uploaded Image: {imageName}</p>
              )}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded preview"
                  className="image-preview"
                />
              )}

              {error && <p className="error-message">{error}</p>}
              <button
                type="submit"
                className={`buttonp ${isLoading ? "button-loading" : ""}`}
                disabled={isLoading} // Disable the button when loading
              >
                {isLoading ? "Posting..." : "Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
