import mongoose, { connections } from "mongoose";
import { connect } from "@/config/Dbconfig";
import Post from "@/model/Post";

export async function POST(req) {
  await connect();

  try {
    const { userId, type, content, imageUrl } = req.body;
    const newPost = await Post.create({ userId, type, content, imageUrl });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
}
