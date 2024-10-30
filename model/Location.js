import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
});

// Prevent redefinition of the model
const Location =
  mongoose.models.Location || mongoose.model("Location", LocationSchema);

export default Location;
