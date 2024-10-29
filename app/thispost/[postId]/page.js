"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import "./in.css";

export default function Page() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const { postId } = useParams();
  const router = useRouter(); // Make sure this is called unconditionally

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/post/gettingall/${postId}`);
        setPost(response.data.post);
      } catch (error) {
        setError("Failed to load post.");
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  if (error) return <div>{error}</div>; // Handle errors
  if (!post) return <div>Loading...</div>; // Loading state

  return (
    <div className="showing">
      <div
        className="post-cardz"
        onClick={() => {
          router.push("/community"); // Correctly use router to navigate
        }}
      >
        <h1 className="coz">{post.content}</h1>
        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post Content" className="post-imagez" />
        )}
        <div className="post-actionsz">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Heart /> <span>{post.likes.length}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MessageCircle /> <span>{post.comments.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
