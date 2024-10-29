import mongoose from "mongoose";
import { connect } from "@/config/Dbconfig";
import Post from "@/model/Post";
import { NextResponse } from "next/server";
import Profile from "@/components/Profile";

export async function GET() {
  await connect();
  try {
    const allpost = await Post.find(
      {},
      "userId type content imageUrl likes comments timestamp"
    ).sort({ _id: -1 }); // Sort by _id in descending order

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
