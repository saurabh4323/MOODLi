const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "PLEASE WRITE EMAIL"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "PLEASE WRITE PASSWORD"],
  },
});

// Create or get the User model
const User = mongoose.models.users || mongoose.model("users", userSchema);

// Export the User model
module.exports = User;
