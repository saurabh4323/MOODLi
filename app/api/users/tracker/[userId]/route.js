import mongoose from "mongoose";
import User from "@/model/SignUp";
import Emoji from "@/model/Emoji";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";

await connect();
export async function POST(req, { params }) {
  try {
    const reqBody = await req.json();
    const { userId, days, emoji, reason, name } = reqBody;
    console.log("Request Body:", reqBody); // Log the request body to see if name is passed correctly

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const todayemoji = new Emoji({ userId, days, emoji, reason, name });
    const todayemojireport = await todayemoji.save();

    return NextResponse.json({
      message: "Emoji saved successfully",
      todayemojireport,
    });
  } catch (error) {
    console.error("Error saving emoji report:", error);
    return NextResponse.json(
      { error: "Failed to save emoji report" },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    // Fetch all users
    const users = await User.find();

    // For each user, fetch the last emoji submitted
    const userEmojis = await Promise.all(
      users.map(async (user) => {
        const lastEmoji = await Emoji.findOne({ userId: user._id }).sort({
          createdAt: -1,
        }); // Assuming createdAt is a timestamp field
        return {
          _id: user._id,
          name: user.name,
          favoriteEmoji: lastEmoji ? lastEmoji.emoji : "😊", // Default emoji if none found
        };
      })
    );

    return NextResponse.json(userEmojis);
  } catch (error) {
    console.error("Error fetching users and their emojis:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
