import mongoose from "mongoose";
import Post from "@/model/Post";
import { connect } from "@/config/Dbconfig";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userId } = params;
  try {
    await connect();

    const userpost = await Post.find({ userId }).sort({ _id: -1 });
    if (!userpost) {
      return NextResponse.json({ status: 404, message: "No posts found" });
    }
    return NextResponse.json({ status: 200, post: userpost });
  } catch (err) {
    console.log(err);
  }
}
