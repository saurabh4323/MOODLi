import mongoose from "mongoose";
import { connect } from "@/config/Dbconfig";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect();
  try {
    const reqbody = await req.json();
    const { userId, content, imageUrl, type } = reqbody;

    // Validate required fields
    if (
      !userId ||
      !type ||
      (type === "text" && !content) ||
      (type === "image" && !imageUrl)
    ) {
      return NextResponse.json(
        {
          status: 400,
          message: "User ID, type, and content or imageUrl are required.",
        },
        { status: 400 }
      );
    }

    // Create a new post
    const post = new Post({ userId, content, imageUrl, type });
    await post.save();

    return NextResponse.json({
      status: 201,
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error("Error creating post:", err);
    return NextResponse.json(
      { status: 500, message: "Error creating post. Please try again." },
      { status: 500 }
    );
  }
}
export async function GET() {
  await connect();
  try {
    const allpost = await Post.find(
      {},
      "userId content imageUrl likes comments timestamp"
    );

    return NextResponse.json({
      status: 200,
      post: allpost,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json(
      { status: 500, message: "Error fetching posts. Please try again later." },
      { status: 500 }
    );
  }
}
