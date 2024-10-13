import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/config/Dbconfig"; // Adjust the path as needed
import Friend from "@/model/Friend";
import Profile from "@/model/Profile";

// Ensure the DB is connected
connect();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    // Find the user's friend list using the userId
    const friendData = await Friend.findOne({ userId });

    if (!friendData || !friendData.friends.length) {
      return NextResponse.json({ friends: [] }, { status: 200 });
    }

    // Fetch profiles of the user's friends based on the stored friend userIds
    const friendProfiles = await Profile.find({
      userId: { $in: friendData.friends },
    }).select(" userId name favoriteEmoji"); // Only return name and favoriteEmoji

    return NextResponse.json({ friends: friendProfiles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching friend list:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
