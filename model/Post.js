import mongoose from "mongoose";

const PostingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "image"],
    required: true,
  },
  content: {
    type: String,
    required: function () {
      return this.type === "text";
    },
  },
  imageUrl: {
    type: String,
    required: function () {
      return this.type === "image";
    },
  },
  timestamp: { type: Date, default: Date.now },
  likes: [{ type: String, default: [] }],
  comments: [
    {
      userId: { type: String, required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", PostingSchema);

export default Post;
