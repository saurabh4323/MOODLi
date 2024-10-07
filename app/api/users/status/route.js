// /api/users/status/route.js
import User from "@/model/SignUp"; // Import your User model
import { connect } from "@/config/Dbconfig"; // Import your database connection
import { NextResponse } from "next/server";

connect(); // Establish a database connection

// Function to set user online status
export async function POST(req) {
  try {
    const { userId, isOnline } = await req.json();

    if (!userId || typeof isOnline !== "boolean") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await User.findByIdAndUpdate(userId, { isOnline }); // Update online status

    return NextResponse.json(
      { message: "User status updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
