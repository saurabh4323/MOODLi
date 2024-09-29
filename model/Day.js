import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Day || mongoose.model("Day", daySchema);
