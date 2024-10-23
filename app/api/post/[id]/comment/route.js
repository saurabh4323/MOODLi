import { connect } from "@/config/Dbconfig";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

// Handle the Comment action
export async function POST(req, { params }) {
  await connect();

  const { id } = params; // Get the post ID from the route
  const { userId, commentText } = await req.json(); // Assuming userId and commentText are sent in the request body

  try {
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { status: 404, message: "Post not found" },
        { status: 404 }
      );
    }

    // Add the new comment
    post.comments.push({ userId, text: commentText, timestamp: new Date() });

    await post.save();
    return NextResponse.json({
      status: 200,
      message: "Comment added",
      comments: post.comments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Error processing the comment. Please try again.",
      },
      { status: 500 }
    );
  }
}
