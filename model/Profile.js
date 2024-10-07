import mongoose from "mongoose"; // Ensure mongoose is imported

// Regular expression to match a single emoji character
const emojiRegex = /^[\p{Emoji}]{1}$/u;

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  favoriteEmoji: {
    type: String,
    validate: {
      validator: (value) => emojiRegex.test(value),
      message: "favoriteEmoji must be a single emoji character.",
    },
    default: "😊",
  },
  bio: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: (value) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value);
      },
      message: "Invalid phone number format. It should be 10 digits.",
    },
    unique: true,
    required: false,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Other",
  },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
// import mongoose from "mongoose"; // Ensure mongoose is imported

// // Regular expression to match a single emoji character
// const emojiRegex = /^[\p{Emoji}]{1}$/u;

// const profileSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//     required: true,
//   },
//   email: {
//     type: String,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   favoriteEmoji: {
//     type: String,
//     validate: {
//       validator: (value) => emojiRegex.test(value),
//       message: "favoriteEmoji must be a single emoji character.",
//     },
//     default: "😊",
//   },
//   bio: {
//     type: String,
//     default: "",
//   },
//   phoneNumber: {
//     type: String,
//     validate: {
//       validator: (value) => {
//         const phoneRegex = /^[0-9]{10}$/;
//         return phoneRegex.test(value);
//       },
//       message: "Invalid phone number format. It should be 10 digits.",
//     },
//     unique: true,
//     required: false,
//   },
//   gender: {
//     type: String,
//     enum: ["Male", "Female", "Other"],
//     default: "Other",
//   },
// });

// const Profile =
//   mongoose.models.Profile || mongoose.model("Profile", profileSchema);

// export default Profile;
