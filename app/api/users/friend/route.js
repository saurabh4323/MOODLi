import mongoose from "mongoose";
import { connect } from "@/config/Dbconfig"; // Ensure this path is correct
import Friend from "@/model/Friend"; // Ensure this path is correct

// Establish a database connection
export async function POST(req) {
  await connect(); // Ensure your DB connection function is correctly set up

  const { userId, friendId } = await req.json(); // Read the JSON data from the request

  try {
    const friendList = await Friend.findOneAndUpdate(
      { userId },
      { $addToSet: { friends: friendId } }, // Add friendId to friends array if it doesn't already exist
      { new: true, upsert: true }
    );

    return new Response(JSON.stringify(friendList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add friend." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  await connect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const friendList = await Friend.findOne({ userId });
    return new Response(JSON.stringify(friendList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to retrieve friend list." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
