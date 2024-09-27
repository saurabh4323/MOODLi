import User from "@/model/Login"; // Import the User model
import Profile from "@/model/Profile"; // Import the Profile model
import { connect } from "@/config/Dbconfig"; // Import database connection
import { NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(req) {
  try {
    const { userId, name, favoriteEmoji, bio } = await req.json();
    console.log("Received data:", { userId, name, favoriteEmoji, bio });

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select("name email");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the profile already exists
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      // If no profile exists, create a new one
      profile = new Profile({ userId, name, favoriteEmoji, bio });
    } else {
      // Update the existing profile, only if the new values are provided
      if (name !== undefined) profile.name = name; // Allow updating the name
      if (favoriteEmoji !== undefined) profile.favoriteEmoji = favoriteEmoji;
      if (bio !== undefined) profile.bio = bio;
    }

    await profile.save(); // Save the profile to the database

    const responseData = {
      name: profile.name || user.name, // Prefer profile name, fallback to user name
      email: user.email,
      favoriteEmoji: profile.favoriteEmoji,
      bio: profile.bio,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
