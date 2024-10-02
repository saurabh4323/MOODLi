import mongoose from "mongoose";

const emojischema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  days: {
    type: Number,
    default: 0,
  },
  emoji: {
    type: String,
    required: true,
  },
  selectedAt: {
    type: Date,
    default: Date.now,
  },
  reason: {
    type: String,
  },
  name: { type: String, required: true },
});

const Emoji = mongoose.models.Emoji || mongoose.model("Emoji", emojischema);

export default Emoji;
