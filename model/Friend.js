import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  friends: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.Friend || mongoose.model("Friend", FriendSchema);
