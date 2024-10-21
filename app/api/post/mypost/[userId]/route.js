import mongoose, { connections } from "mongoose";
import { connect } from "@/config/Dbconfig";
import Post from "@/model/Post";

export default async function handler(req, res) {
  const { userId } = req.query;
  await connect();

  if (req.method === "GET") {
    try {
      const userPosts = await Post.find({ userId }).sort({ timestamp: -1 });
      res.status(200).json(userPosts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user posts", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
