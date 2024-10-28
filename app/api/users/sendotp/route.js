// app/api/users/sendotp/route.js

import twilio from "twilio";
import { connect } from "@/config/Dbconfig"; // Import your database connection
import Otp from "@/model/otp"; // Import the Otp model

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to validate phone numbers (E.164 format)
const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+\d{1,15}$/; // Adjust the regex as necessary for your use case
  return phoneRegex.test(phoneNumber);
};

// Export named function for POST requests
export async function POST(req) {
  const { phoneNumber } = await req.json(); // Retrieve phone number from the request body

  if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Valid phone number is required.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await connect(); // Ensure you connect to the database

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Customize the OTP message
    const messageBody = `Your OTP for Moodli verification is ${otp}. It is valid for 10 minutes.`;

    // Send the OTP via SMS
    await client.messages.create({
      body: messageBody, // Use the customized message
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    // Store the OTP in MongoDB
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    await Otp.updateOne(
      { phoneNumber },
      { otp, expiresAt },
      { upsert: true } // Create a new entry if it doesn't exist
    );

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error sending OTP" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
