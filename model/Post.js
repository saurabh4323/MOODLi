import mongoose from "mongoose";

const PostingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ["text", "image"] },
  content: { type: String },
  imageUrl: { type: String },
  timestamp: { type: Date, default: Date.now },
  likes: [{ type: String }],
  comments: [
    {
      userId: String,
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", PostingSchema);

export default Post;
