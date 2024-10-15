import mongoose from "mongoose";
import Contact from "@/model/Contact";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server"; // Import NextResponse

export async function POST(req) {
  connect();
  try {
    const reqbody = await req.json();
    const { userId, name, email, reason } = reqbody;

    if (!userId || !name || !email || !reason) {
      return NextResponse.json({ status: 400, message: "Invalid request" });
    }

    console.log("Received data:", reqbody);

    const contactus = new Contact({ userId, name, email, reason });
    const savecontact = await contactus.save();

    return NextResponse.json({
      message: "Feedback saved successfully",
      savecontact,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
