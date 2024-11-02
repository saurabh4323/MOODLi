import mongoose from "mongoose";

const PeriodTrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  periodDay: { type: Number, required: true, min: 1, max: 7 },
  overallDayRating: {
    type: String,
    enum: ["Great", "Okay", "Tiring", "Painful"],
    required: true,
  },
  moodSwings: {
    type: String,
    enum: ["Little", "Moderate", "High", "Severe"],
    required: true,
  },
  cravings: {
    type: String,
    enum: ["None", "Mild", "Moderate", "Strong"],
    required: true,
  },
  energyLevels: {
    type: String,
    enum: ["High", "Medium", "Low", "Exhausted"],
    required: true,
  },
  notes: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PeriodTracking", PeriodTrackingSchema);
