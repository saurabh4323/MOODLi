import mongoose from "mongoose";
import User from "@/model/SignUp";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

connect();

export async function POST(req) {
  const res = NextResponse.next();

  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log("Got request for login:", reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }
    console.log(user.email);

    return NextResponse.json(
      {
        message: "Login successful",
        success: true,
        userId: user._id,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
