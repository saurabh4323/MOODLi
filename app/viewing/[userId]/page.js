"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading"; // Assuming Loading is a loading spinner/component
import "./display.css";
import "./st.css";
export default function Page({ params }) {
  const route = useRouter();
  const { viewinguserId } = params; // Extracting viewinguserId from params
  const [userpost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setcurrentUser] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);

  // Fetch Functions
  const fetchProfile = async (userId) => {
    try {
      const res = await axios.post("/api/users/sau", { userId });
      setcurrentUser(res.data);
      console.log("Fetched Current User:", res.data);
    } catch (error) {
      console.error("Error fetching profile", error);
      setError("Failed to fetch profile.");
    }
  };

  const fetchPosts = async (userId) => {
    try {
      const response = await axios.get(`/api/post/individual/${userId}`);
      setUserPost(response.data.post || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFriends = async (userId) => {
    try {
      const response = await axios.get(`/api/feeltalk/friend?userId=${userId}`);
      const friends = Array.isArray(response.data?.friends)
        ? response.data.friends
        : [];
      setFriendList(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      setFriendList([]);
    }
  };

  useEffect(() => {
    if (viewinguserId) {
      fetchProfile(viewinguserId);
      fetchPosts(viewinguserId);
      fetchFriends(viewinguserId);
    }
  }, [viewinguserId]);

  const handleLike = async (postId) => {
    try {
      await axios.post(`/api/post/${postId}/like`, { userId: viewinguserId });
      fetchPosts(viewinguserId);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId) => {
    try {
      await axios.post(`/api/post/${postId}/comment`, {
        userId: viewinguserId,
        commentText,
      });
      setCommentText("");
      fetchPosts(viewinguserId);
    } catch (error) {
      console.error("Error adding comment:", error);
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

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="displaypage">
      {currentUser && (
        <div className="current-user">
          <div className="cul">
            <div className="fav">
              <p>{currentUser.favoriteEmoji}</p>
            </div>
          </div>
          <div className="cur">
            <h3 className="nnn" style={{ marginBottom: "3px" }}>
              {currentUser.name}
            </h3>
            <h6 className="bioo" style={{ fontSize: "14px" }}>
              {currentUser.bio}
            </h6>
            <div className="ppedi">
              <p>
                Post{" "}
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  {userpost.length}
                </span>
              </p>
              <p>
                Friends{" "}
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  {friendList.length}
                </span>
              </p>
            </div>
            <div className="btnss">
              <button className="buttond">Share</button>
            </div>
          </div>
        </div>
      )}
      <div className="post-list-container">
        {userpost.length > 0 ? (
          userpost.map((post) => (
            <div key={post._id} className="post-card">
              <h1>{post.content}</h1>
              <div className="post-actions">
                <button onClick={() => handleLike(post._id)}>
                  <Heart /> <span>{post.likes.length}</span>
                </button>
                <button>
                  <MessageCircle /> <span>{post.comments.length}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>

      {showCommentModal && selectedPost && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Comments for {selectedPost.content}</h2>
            <div className="comments-container">
              {selectedPost.comments.length > 0 ? (
                selectedPost.comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    <p>{comment.userId}:</p>
                    <span>{comment.text}</span>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={() => handleComment(selectedPost._id)}>
              Submit
            </button>
            <button onClick={closeCommentModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
