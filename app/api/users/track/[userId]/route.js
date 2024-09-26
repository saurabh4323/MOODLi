import mongoose from "mongoose";
import User from "@/model/SignUp";
import Emoji from "@/model/Emoji";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

await connect();

export async function GET(req, { params }) {
  const { userId } = params;
  console.log("Received userId from params:", userId);

  if (!userId) {
    console.log("Error: User ID not provided");
    return NextResponse.json({
      message: "User ID not provided",
      status: 400,
    });
  }

  try {
    const userExists = await User.findById(userId);
    console.log("Checking if user exists:", userExists);

    if (!userExists) {
      console.log("Error: User not found");
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    const userObjectId = new ObjectId(userId);

    const emojis = await Emoji.find({ userId: userObjectId })
      .sort({ selectedAt: -1 })
      .limit(5);

    console.log("Fetched emojis for user:", emojis);

    if (emojis.length === 0) {
      console.log("Error: No emojis found for this user");
      return NextResponse.json({
        message: "No emojis found for this user",
        status: 404,
      });
    }

    return NextResponse.json(emojis, { status: 200 });
  } catch (error) {
    console.error("Error fetching emojis:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}
