import { connect } from "@/config/Dbconfig";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

// Handle the Like action
export async function POST(req, { params }) {
  await connect();

  const { id } = params; // Get the post ID from the route
  const { userId } = await req.json(); // Assuming userId is sent in the request body

  try {
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { status: 404, message: "Post not found" },
        { status: 404 }
      );
    }

    // Check if the user has already liked the post
    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      // If the user has already liked, remove the like
      post.likes = post.likes.filter((like) => like !== userId);
    } else {
      // If the user hasn't liked, add the like
      post.likes.push(userId);
    }

    await post.save();
    return NextResponse.json({
      status: 200,
      message: "Post updated",
      likes: post.likes,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json(
      { status: 500, message: "Error processing the like. Please try again." },
      { status: 500 }
    );
  }
}
