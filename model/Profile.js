import mongoose from "mongoose";

// Regular expression to match a single emoji character
const emojiRegex = /^[\p{Emoji}]{1}$/u;

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  favoriteEmoji: {
    type: String,
    validate: {
      validator: (value) => emojiRegex.test(value), // Validate using regex
      message: "favoriteEmoji must be a single emoji character.",
    },
    default: "😊",
  },
  bio: {
    type: String,
    default: "",
  },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
