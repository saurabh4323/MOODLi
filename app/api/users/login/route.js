// app/api/users/login/route.js
import mongoose from "mongoose";
import User from "@/model/SignUp";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Cors from "@/lib/cors"; // Ensure this imports the CORS setup correctly

// Connect to the database
connect();

// Initialize CORS middleware
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper function to run middleware
async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(req) {
  // Define a response object for the middleware
  const res = NextResponse.next();

  try {
    // Run CORS middleware
    await runMiddleware(req, res, cors);

    const reqBody = await req.json();
    const { email, password } = reqBody;

    console.log("Got request for login:", reqBody);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }

    // Check password
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }

    // Successful login
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
