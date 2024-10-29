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
  console.log("viewusingid", viewinguserId);
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
      // console.log("Fetching profile...");
      const res = await axios.post("/api/users/sau", { userId });
      setcurrentUser(res.data);
      // console.log("Fetched Current User:", res.data);
    } catch (error) {
      console.error("Error fetching profile", error);
      setError("Failed to fetch profile.");
    }
  };

  const fetchPosts = async (userId) => {
    try {
      // console.log("Fetching posts...");
      const response = await axios.get(`/api/post/individual/${userId}`);
      setUserPost(response.data.post || []);
      // console.log("Fetched Posts:", response.data.post);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFriends = async (userId) => {
    try {
      // console.log("Fetching friends...");
      const response = await axios.get(`/api/feeltalk/friend?userId=${userId}`);
      const friends = Array.isArray(response.data?.friends)
        ? response.data.friends
        : [];
      setFriendList(friends);
      // console.log("Fetched Friends:", friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      setFriendList([]);
    }
  };

  useEffect(() => {
    if (viewinguserId) {
      // console.log("Starting data fetch for user:", viewinguserId);
      fetchProfile(viewinguserId);
      fetchPosts(viewinguserId);
      fetchFriends(viewinguserId);
    }
  }, [viewinguserId]);

  const handleLike = async (postId) => {
    try {
      // console.log("Liking post:", postId);
      await axios.post(`/api/post/${postId}/like`, { userId: viewinguserId });
      fetchPosts(viewinguserId);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId) => {
    try {
      // console.log("Adding comment to post:", postId);
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
    console.log("Opening comment modal for post:", post._id);
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    console.log("Closing comment modal");
    setShowCommentModal(false);
    setSelectedPost(null);
  };
  const handleConfirmAddFriend = async () => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("userId");
      const friendId = viewinguserId;

      try {
        await axios.post("/api/users/friend", { userId, friendId });
        alert(`${currentUser.name} has been added as a friend!`);
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    }
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
              <button className="buttond" onClick={handleConfirmAddFriend}>
                ADD
              </button>
              <button
                className="buttond"
                onClick={() => {
                  route.push("/chat");
                }}
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="post-list-containerz">
        {userpost.length > 0 ? (
          userpost.map((post) => (
            <div key={post._id} className="post-cardz">
              {currentUser && (
                <div className="user-infoz">
                  {currentUser.favoriteEmoji}
                  {currentUser.name || "Unknown User"}{" "}
                  <span className="timestamp">
                    {post.timestamp
                      ? new Date(post.timestamp).toLocaleDateString()
                      : "Unknown date"}
                  </span>
                </div>
              )}
              <h1 className="coz">{post.content}</h1>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post Content"
                  className="post-imagez"
                />
              )}
              <p></p>
              <div className="post-actionsz">
                <button onClick={() => handleLike(post._id)}>
                  <Heart /> <span>{post.likes.length}</span>
                </button>
                <button onClick={() => openCommentModal(post)}>
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
        <div className="modal-overlayq">
          <div className="modal-contentq">
            <h2>Comments for {selectedPost.content}</h2>
            <div className="comments-container">
              {selectedPost.comments.length > 0 ? (
                selectedPost.comments.map((comment) => (
                  <div key={comment._id} className="comment-input">
                    <p>{comment.userId}:</p>
                    <span>{comment.text}</span>
                  </div>
                ))
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
              <button className="close-modal-btn" onClick={closeCommentModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
