import { connect } from "@/config/Dbconfig";
import Mood from "@/model/mood"; // Ensure the path is correct

// Handle POST request to update or create a mood
export async function POST(req) {
  await connect();

  const { userId, username, currentMood } = await req.json();

  try {
    const moodEntry = await Mood.findOneAndUpdate(
      { userId },
      { username, currentMood },
      { new: true, upsert: true }
    );

    console.log("Mood updated:", moodEntry);
    return new Response(JSON.stringify(moodEntry), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving mood:", error);
    return new Response(JSON.stringify({ error: "Failed to save mood." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Handle GET request to fetch all moods
export async function GET(req) {
  await connect();

  try {
    const moods = await Mood.find({}).select("username currentMood userId");
    console.log("Fetched moods data:", moods);
    return new Response(JSON.stringify(moods), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching moods:", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve moods." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
