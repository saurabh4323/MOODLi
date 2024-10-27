import mongoose from "mongoose";

// Define the schema for notifications
const NotificationSchema = new mongoose.Schema({
  receiverId: {
    type: String,
    required: true,
  },
  notifications: [
    {
      senderId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now, // Timestamp
      },
    },
  ],
});

// Export the model
export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
