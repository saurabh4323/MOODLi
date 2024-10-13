import mongoose from "mongoose";
import { connect } from "@/config/Dbconfig"; // Adjust the import based on your project structure
import Message from "@/model/Message";
import { NextResponse } from "next/server"; // Import NextResponse

// Ensure the DB is connected
connect();

export async function GET(req) {
  // Fetch messages between two users
  const { searchParams } = new URL(req.url); // Get search parameters from the request
  const senderId = searchParams.get("senderId");
  const receiverId = searchParams.get("receiverId");

  console.log("GET Request - Sender ID:", senderId, "Receiver ID:", receiverId); // Debugging line

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    console.log("Fetched Messages:", messages); // Debugging line
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  // Send a new message
  const { senderId, receiverId, content } = await req.json(); // Use await req.json() to get the request body
  console.log(
    "POST Request - Sender ID:",
    senderId,
    "Receiver ID:",
    receiverId,
    "Content:",
    content
  ); // Debugging line

  if (!senderId || !receiverId || !content) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      content,
    });

    await newMessage.save();

    console.log("New Message Saved:", newMessage); // Debugging line
    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
