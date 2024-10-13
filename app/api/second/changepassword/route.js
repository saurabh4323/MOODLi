import User from "@/model/Login";
import { connect } from "@/config/Dbconfig";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect(); // Connect to your database

  const { userId, currentPassword, newPassword } = await req.json();

  try {
    const user = await User.findById(userId); // Fetch user by ID

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "Incorrect current password" }),
        { status: 400 }
      );
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Password updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
