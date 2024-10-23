"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import "./style.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const UserId = localStorage.getItem("userId");
      setUserId(UserId);
    }
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/post/posting", {
        headers: {
          "Cache-Control": "no-cache",
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
      const response = await axios.get("/api/users/sau");
      setProfiles(response.data);
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

  // Like handler
  const handleLike = async (postId) => {
    try {
      await axios.post(`/api/post/${postId}/like`, { userId });
      fetchPosts(); // Refresh posts to update the like count
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Comment handler
  const handleComment = async (postId) => {
    try {
      await axios.post(`/api/post/${postId}/comment`, {
        userId,
        commentText,
      });
      setCommentText(""); // Clear the comment box
      fetchPosts(); // Refresh posts to update comments
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Open comment modal
  const openCommentModal = (post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  // Close comment modal
  const closeCommentModal = () => {
    setShowCommentModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="post-list-container">
      {posts.map((post) => {
        const profile = getProfileById(post.userId);

        return (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <div className="user-info">
                <h4 className="usernamek" style={{ color: "#fff" }}>
                  {profile?.name || "Unknown User"}{" "}
                  {profile?.favoriteEmoji || "🙂"}
                </h4>{" "}
                <span className="timestamp">
                  {post.timestamp
                    ? new Date(post.timestamp).toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>
            </div>

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

            <div className="post-actions" style={{ color: "white" }}>
              <button
                className="action-button"
                onClick={() => handleLike(post._id)}
              >
                <Heart color="#fff" className="icon" />
                <span style={{ color: "#fff" }}>({post.likes.length})</span>
              </button>
              <button
                className="action-button"
                onClick={() => openCommentModal(post)}
              >
                <MessageCircle color="#ffffff" className="icon" />{" "}
                <span style={{ color: "#fff" }}>comment</span>
              </button>
            </div>
          </div>
        );
      })}

      {/* Comment Modal */}
      {showCommentModal && selectedPost && (
        <div className="modal-overlayq">
          <div className="modal-contentq">
            {/* <h2>Comments for "{selectedPost?.content}"</h2> */}

            {/* Comments Section */}
            <div className="comments-container">
              {selectedPost.comments.length > 0 ? (
                selectedPost.comments.map((comment) => {
                  const commenterProfile = getProfileById(comment.userId);
                  return (
                    <div key={comment._id} className="comment">
                      <p>{commenterProfile?.name || "Unknown"} :</p>{" "}
                      <span>{comment.text}</span>
                    </div>
                  );
                })
              ) : (
                <p>No comments yet.</p>
              )}
            </div>

            {/* Comment Input */}
            <div className="comment-input">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button
                className="submit-comment-btn"
                onClick={() => handleComment(selectedPost._id)}
              >
                Submit
              </button>
            </div>

            <button className="close-modal-btn" onClick={closeCommentModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
