// /api/users/message/route.js
import Message from "@/model/Message"; // Message model
import { connect } from "@/config/Dbconfig"; // Connect to the database
import { NextResponse } from "next/server";

connect();

export async function GET(req) {
  try {
    // Fetch query params from the request
    const { searchParams } = new URL(req.url);
    const senderId = searchParams.get("senderId");
    const receiverId = searchParams.get("receiverId");

    // Fetch messages between these two users
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // Sort messages by creation time

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { senderId, receiverId, message, name, emoji } = await req.json();

    if (!message || !senderId || !receiverId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      name,
      emoji,
    });

    await newMessage.save(); // Save message to database

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
