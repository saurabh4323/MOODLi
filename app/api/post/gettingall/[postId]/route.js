// pages/api/gettingPost/[postId].js (or app/api/gettingPost/[postId]/route.js for app directory)

import mongoose from "mongoose";
import { connect } from "@/config/Dbconfig";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connect();
  const { postId } = params; // Get postId from params
  try {
    const post = await Post.findById(
      postId,
      "userId type content imageUrl likes comments timestamp"
    );
    if (!post) {
      return NextResponse.json(
        { status: 404, message: "Post not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      status: 200,
      post: post,
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { status: 500, message: "Error fetching post. Please try again later." },
      { status: 500 }
    );
  }
}
