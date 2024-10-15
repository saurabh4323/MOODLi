import mongoose from "mongoose";

const contact = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "PLEASE WRITE EMAIL"],
    unique: true,
  },
  reason: {
    type: String,
  },
});
const Contact = mongoose.models.contact || mongoose.model("contact", contact);
export default Contact;
