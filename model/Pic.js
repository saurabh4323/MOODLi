import mongoose from "mongoose";
const pic = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

export default mongoose.models.Pic || mongoose.model("pic", pic);
