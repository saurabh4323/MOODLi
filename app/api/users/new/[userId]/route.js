import { connect } from "@/config/Dbconfig";
import Profile from "@/model/Profile";
import { NextResponse } from "next/server";

connect();

export async function GET(req, { params }) {
  console.log("params", params);
  const { userId } = params;

  try {
    const currentUser = await Profile.findOne({ userId });
    if (!currentUser) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({ success: true, user: currentUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error fetching user",
    });
  }
}
