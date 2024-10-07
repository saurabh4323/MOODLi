import mongoose from "mongoose";

const feedback = new mongoose.Schema({
  name: {
    type: String,
  },
  feedback: {
    type: String,
  },
});
const Feed = mongoose.models.feedback || mongoose.model("feedback", feedback);
export default Feed;
