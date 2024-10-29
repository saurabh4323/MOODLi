"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import "./in.css";
export default function Page() {
  const [post, setPost] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const { postId } = useParams(); // Get the postId from the URL

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Use the correct endpoint for fetching a post by ID
        const response = await axios.get(`/api/post/gettingall/${postId}`);

        // Set the post state with the response data
        setPost(response.data.post); // Adjust this line if the structure is different

        // Fetch the user's profile using the userId from the post
      } catch (error) {
        setError("Failed to load post.");
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>;
  const route = useRouter();
  return (
    <div className="showing">
      {/* <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post Content" />} */}
      <div
        className="post-cardz"
        onClick={() => {
          route.push("/community");
        }}
      >
        {/* {currentUser && (
                <div className="user-infoz">
                  {currentUser.favoriteEmoji}
                  {currentUser.name || "Unknown User"}{" "}
                  <span className="timestamp">
                    {post.timestamp
                      ? new Date(post.timestamp).toLocaleDateString()
                      : "Unknown date"}
                  </span>
                </div>
              )} */}
        <h1 className="coz">{post.content}</h1>
        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post Content" className="post-imagez" />
        )}
        <p></p>
        <div className="post-actionsz">
          <button
            onClick={() => {
              route.push("/community");
            }}
          >
            <Heart /> <span>{post.likes.length}</span>
          </button>
          <button
            onClick={() => {
              route.push("/community");
            }}
          >
            <MessageCircle /> <span>{post.comments.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
