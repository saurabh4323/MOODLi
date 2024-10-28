// app/api/users/verifyotp/route.js

import { connect } from "@/config/Dbconfig"; // Import your database connection
import Otp from "@/model/otp"; // Import the Otp model

// Export named function for POST requests
export async function POST(req) {
  const { phoneNumber, otp } = await req.json(); // Retrieve phone number and OTP from the request body

  await connect(); // Ensure you connect to the database

  try {
    const otpRecord = await Otp.findOne({ phoneNumber });

    if (!otpRecord) {
      return new Response(
        JSON.stringify({ success: false, message: "OTP not sent or expired." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the OTP is correct and not expired
    if (otp === otpRecord.otp && otpRecord.expiresAt > new Date()) {
      await Otp.deleteOne({ phoneNumber }); // Remove the OTP after successful verification
      return new Response(
        JSON.stringify({
          success: true,
          message: "OTP verified successfully!",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "Incorrect OTP. Please try again.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error verifying OTP." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
