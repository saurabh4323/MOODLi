const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// This line checks if the model already exists before defining it again
const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

module.exports = Message;
