import User from "@/model/Login";
import { connect } from "@/config/Dbconfig";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/Mail";
import Cors, { runMiddleware } from "@/lib/cors"; // Import CORS

connect();
const saltRounds = 10;

export async function POST(req) {
  try {
    await runMiddleware(req, NextResponse, Cors); // Run CORS middleware

    const reqBody = await req.json();
    const { name, email, password } = reqBody;

    console.log("Request body:", reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    console.log("User saved:", savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "You registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
