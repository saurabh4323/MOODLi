import User from "@/model/Login"; // Import the User model
import Profile from "@/model/Profile"; // Import the Profile model
import { connect } from "@/config/Dbconfig"; // Import database connection
import { NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(req) {
  try {
    const { userId, email, name, favoriteEmoji, bio, phoneNumber, gender } =
      await req.json();
    console.log("Received data:", {
      userId,
      name,
      email,
      favoriteEmoji,
      bio,
      phoneNumber,
      gender,
    });

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

    let profile = await Profile.findOne({ userId });
    if (!profile) {
      profile = new Profile({
        userId,
        name,
        email,
        favoriteEmoji,
        bio,
        phoneNumber,
        gender,
      });
    } else {
      // Update existing profile fields only if provided
      if (name !== undefined) profile.name = name;
      if (favoriteEmoji !== undefined) profile.favoriteEmoji = favoriteEmoji;
      if (email !== undefined) profile.email = user.email;
      if (bio !== undefined) profile.bio = bio;
      if (phoneNumber !== undefined) profile.phoneNumber = phoneNumber;
      if (gender !== undefined) profile.gender = gender;
    }

    await profile.save(); // Save the profile to the database
    console.log("Profile saved:", profile);

    const responseData = {
      name: profile.name || user.name,
      email: user.email,
      favoriteEmoji: profile.favoriteEmoji,
      bio: profile.bio,
      phoneNumber: profile.phoneNumber,
      gender: profile.gender,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
