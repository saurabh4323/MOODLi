import mongoose from "mongoose";
import User from "@/model/SignUp";
import Emoji from "@/model/Emoji";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";

await connect();

export async function POST(req, { params }) {
  try {
    const reqBody = await req.json();
    const { userId, days, emoji, reason } = reqBody;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const todayemoji = new Emoji({ userId, days, emoji, reason });
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
