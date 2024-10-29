import Notification from "@/model/Notification";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";

await connect();

export async function POST(req, { params }) {
  try {
    const reqBody = await req.json();
    const { senderId, receiverId, content } = reqBody;

    // Find the notification document for the receiverId
    let notificationDocument = await Notification.findOne({ receiverId });

    // If it doesn't exist, create a new one
    if (!notificationDocument) {
      notificationDocument = new Notification({
        receiverId,
        notifications: [],
      });
    }

    // Check if the content indicates a read notification
    if (content.toLowerCase() === "notification read") {
      // Clear the notifications array
      notificationDocument.notifications = [];
    } else {
      // Push the new notification into the notifications array
      notificationDocument.notifications.push({
        senderId,
        content,
        createdAt: new Date(), // Set the current timestamp
      });
    }

    await notificationDocument.save();

    return NextResponse.json({
      message: "Notification processed successfully",
      data: notificationDocument,
    });
  } catch (err) {
    console.error("Error processing notification:", err);
    return NextResponse.json(
      {
        message: "Failed to process notification",
        error: err.message || "An error occurred",
      },
      { status: 500 }
    );
  }
}
export async function GET(req, { params }) {
  await connect();
  const { receiverId } = params;

  console.log("Received receiverId:", receiverId);

  try {
    const notificationDocument = await Notification.findOne({
      receiverId,
    }).lean(); // Using lean() for better performance

    console.log("Retrieved notification document:", notificationDocument);

    if (!notificationDocument) {
      return NextResponse.json({
        message: "No notifications found",
        data: [],
      });
    }

    // Reverse the notifications array to ensure the newest notifications come first
    const reversedNotifications = notificationDocument.notifications.reverse();

    console.log("Notifications array (reversed):", reversedNotifications);

    return NextResponse.json({
      message: "Notifications retrieved successfully",
      data: reversedNotifications,
    });
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve notifications",
        error: error.message || "An error occurred",
      },
      { status: 500 }
    );
  }
}
