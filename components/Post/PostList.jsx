"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Forward, Heart, MessageCircle } from "lucide-react";
import "./style.css";
import { useRouter } from "next/navigation";
import { comment } from "postcss";
import Loading from "../Loading";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const route = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdFromStorage = localStorage.getItem("userId");
      setUserId(userIdFromStorage);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/post/posting", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      // console.log(response.data.post);
      setPosts(response.data.post);
    } catch (error) {
      console.error("Error fetching posts", error);
      setError("Failed to fetch posts.");
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("/api/users/sau");
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles", error);
      setError("Failed to fetch profiles.");
    }
  };

  const getProfileById = (userId) => {
    return profiles.find((profile) => profile.userId === userId);
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchPosts(), fetchProfiles()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(`/api/post/${postId}/like`, { userId });
      fetchPosts(); // Refresh posts to update the like count
      sendLikeNotification(postId); // Send notification after liking
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const sendLikeNotification = async (postId) => {
    try {
      const post = posts.find((p) => p._id === postId);
      if (post && userId) {
        await axios.post(`/api/notification/${post.userId}`, {
          senderId: userId,
          receiverId: post.userId,
          content: "liked your post",
        });
      }
    } catch (error) {
      console.error("Error sending like notification:", error);
    }
  };

  const viewing = (post) => {
    const viewingUserId = post.userId;
    route.push(`/viewing/${viewingUserId}`);
  };

  const handleComment = async (postId) => {
    try {
      await axios.post(`/api/post/${postId}/comment`, {
        userId,
        commentText,
      });
      setCommentText("");
      fetchPosts(); // Refresh posts to update comments
      sendCommentNotification(postId); // Call notification function
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const sendCommentNotification = async (postId) => {
    try {
      const post = posts.find((p) => p._id === postId);
      if (post && userId) {
        await axios.post(`/api/notification/${post.userId}`, {
          senderId: userId,
          receiverId: post.userId,
          content: "commented on your post",
        });
      }
    } catch (error) {
      console.error("Error sending comment notification:", error);
    }
  };

  const openCommentModal = (post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
    setSelectedPost(null);
  };
  const sharepost = (postId) => {
    const postUrl = `${window.location.origin}/thispost/${postId}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Share Post",
          text: "Check out this post on Mood App!",
          url: postUrl,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(postUrl);
      alert("Post link copied to clipboard!");
    }
  };
  if (loading)
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="post-list-container">
      {posts.map((post) => {
        const profile = getProfileById(post.userId);

        return (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <div className="user-info">
                <h4
                  onClick={() => viewing(post)}
                  className="usernamek"
                  style={{
                    // color: "aliceblue",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  {" "}
                  {profile?.favoriteEmoji || "🙂"}
                  {profile?.name || "Unknown User"}{" "}
                </h4>
                <span className="timestamp">
                  {post.timestamp
                    ? new Date(post.timestamp).toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>
            </div>

            <div className="post-content">
              <p className="post-contentd">{post.content}</p>
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
                <Heart className="icon" />
                <span>({post.likes.length})</span>
              </button>
              <button
                className="action-button"
                onClick={() => sharepost(post._id)}
              >
                <Forward></Forward>{" "}
              </button>
              <button
                className="action-button"
                onClick={() => openCommentModal(post)}
              >
                <MessageCircle className="icon" />{" "}
                <span>{post.comments.length}</span>
              </button>
            </div>
          </div>
        );
      })}

      {showCommentModal && selectedPost && (
        <div className="modal-overlayq">
          <div className="modal-contentq">
            <div className="comments-container">
              {selectedPost.comments.length > 0 ? (
                selectedPost.comments.map((comment) => {
                  const commenterProfile = getProfileById(comment.userId);
                  return (
                    <div key={comment._id} className="comment">
                      <p>
                        {commenterProfile?.name || "Unknown"}{" "}
                        {commenterProfile?.favoriteEmoji}: {comment.text}
                      </p>{" "}
                    </div>
                  );
                })
              ) : (
                <p>No comments yet.</p>
              )}
            </div>

            <div className="comment-input">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button
                className="submit-comment-btn"
                onClick={() => {
                  handleComment(selectedPost._id);
                  closeCommentModal(); // Close the modal after submitting
                }}
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
