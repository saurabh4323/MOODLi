"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import "./style.css";
import "./display.css";
import Button from "../Button";
import Loading from "../Loading";
import Notification from "./Notifi";
export default function Displaypost() {
  const route = useRouter();
  const [userpost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [currentuser, setCurrentUser] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [viewinguser, setviewinguser] = useState("");
  const [days, setDays] = useState(0);
  // Fetch Functions
  const fetchProfile = async (userId) => {
    try {
      const res = await axios.post("/api/users/sau", { userId });
      setCurrentUser(res.data);

      // console.log("Fetched Current User:", res.data);
    } catch (error) {
      console.error("Error fetching profile", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchTrack = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`/api/users/days/${userId}`);
          setDays(response.data.days);
        } catch (error) {
          console.error("Error fetching days:", error);
        }
      }
    };
    fetchTrack();
  }, []);

  const fetchPosts = async (userId) => {
    try {
      const response = await axios.get(`/api/post/individual/${userId}`);
      setUserPost(response.data.post || []);
      console.log(response.data.post);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  // const fetchProfiles = async () => {
  //   try {
  //     const response = await axios.get(`/api/users/sau/${userId}`);
  //     console.log("jss");
  //     console.log(response.data);
  //     setProfiles(response.data.user);
  //   } catch (error) {
  //     console.error("Error fetching profiles", error);
  //   }
  // };

  const fetchFriends = async (userId) => {
    try {
      const response = await axios.get(`/api/feeltalk/friend?userId=${userId}`);
      // console.log("Friend profiles received:", response.data);
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
    const userIdFromStorage = localStorage.getItem("userId");
    setUserId(userIdFromStorage);
    if (userIdFromStorage) {
      fetchProfile(userIdFromStorage);
      fetchPosts(userIdFromStorage);
      // fetchProfiles();
      fetchFriends(userIdFromStorage);
    }
  }, []);

  const getProfileById = (userId) =>
    profiles.find((profile) => profile.userId === userId);

  const handleLike = async (postId) => {
    try {
      await axios.post(`/api/post/${postId}/like`, { userId });
      fetchPosts(userId);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId) => {
    try {
      await axios.post(`/api/post/${postId}/comment`, { userId, commentText });
      setCommentText("");
      fetchPosts(userId);
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

  const edit = () => route.push("/editprofile");

  if (loading) return <Loading></Loading>;
  if (error) return <p>{error}</p>;

  return (
    <div className="s">
      {/* <Notification></Notification> */}

      {!currentuser && (
        <div
          className="complete"
          style={{
            position: "absolute",
          }}
        >
          <button
            onClick={() => {
              route.push("/editprofile");
            }}
            style={{ width: "300px", height: "100px" }}
            className="buttond"
          >
            click to complete profile
          </button>
        </div>
      )}
      {currentuser && (
        <div className="current-user">
          <div className="cul">
            <div className="fav">
              <p>{currentuser.favoriteEmoji}</p>
            </div>
          </div>
          <div className="cur">
            <h3 className="nnn" style={{ marginBottom: "3px" }}>
              {currentuser.name}
            </h3>
            <h6 className="bioo" style={{ fontSize: "14px" }}>
              {currentuser.bio}
              {/* <Notification></Notification> */}
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
              <p>
                Days{" "}
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  {days}
                </span>
              </p>
            </div>
            <div className="btnss">
              <button onClick={edit} className="buttond">
                Edit Profile
              </button>
              <button className="buttond">Share</button>
            </div>
          </div>
        </div>
      )}
      <div className="post-list-container">
        {userpost.length > 0 ? (
          userpost.map((post) => (
            <div key={post._id} className="post-card">
              {currentuser && (
                <div className="post-header">
                  <h3
                    className="usernamek"
                    style={{
                      // color: "aliceblue",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    {currentuser.name || "Unknown User"}{" "}
                  </h3>

                  <span className="timestamp" style={{ marginLeft: "50px" }}>
                    {post.timestamp
                      ? new Date(post.timestamp).toLocaleDateString()
                      : "Unknown date"}
                  </span>
                </div>
              )}
              <h1>{post.content}</h1>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post Content"
                  className="post-image"
                />
              )}
              <div className="post-actions" style={{ color: "white" }}>
                <button
                  className="action-button"
                  onClick={() => handleLike(post._id)}
                >
                  <Heart />
                  <span style={{ marginLeft: "5px" }}>
                    ({post.likes.length})
                  </span>
                </button>
                <button
                  className="action-button"
                  // onClick={() => openCommentModal(post)}
                >
                  <MessageCircle />
                  <span style={{ color: "#727272d8" }}>
                    {post.comments.length}
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p> </p>
        )}
      </div>
      {showCommentModal && selectedPost && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* <h2>Comments for {selectedPost.content}"</h2> */}
            <div className="comments-container">
              {selectedPost.comments.length > 0 ? (
                selectedPost.comments.map((comment) => {
                  const commenterProfile = getProfileById(comment.userId);
                  return (
                    <div key={comment._id} className="comment">
                      <p>{commenterProfile?.name || "Unknown"}:</p>
                      <span>{comment.text}</span>
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
