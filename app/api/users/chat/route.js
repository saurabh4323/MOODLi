// api/users/sau/route.js
import User from "@/model/Login"; // Import your User model
import { connect } from "@/config/Dbconfig"; // Import your database connection
import { NextResponse } from "next/server";

connect(); // Establish a database connection

export async function GET(req) {
  try {
    const users = await User.find({}, "name favoriteEmoji");
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
