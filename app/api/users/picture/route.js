import mongoose from "mongoose";
import Profile from "@/model/Profile";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";
connect();

export async function GET() {
  try {
    const users = await Profile.find({}, "bio favoriteEmoji");
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
