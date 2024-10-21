import mongoose, { connections } from "mongoose";
import { connect } from "@/config/Dbconfig";
import Post from "@/model/Post";

export default async function handler(req, res) {
  await connect();

  if (req.method === "GET") {
    try {
      const posts = await Post.find().sort({ timestamp: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
