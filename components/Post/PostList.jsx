"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/post/gettingall");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleLike = async (postId) => {
    // Implement like functionality here
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post Image" />}
          <div className="post-actions">
            <button onClick={() => handleLike(post._id)}>
              Like ({post.likes.length})
            </button>
            <button className="buttonp ">Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
}
