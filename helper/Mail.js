import nodemailer from "nodemailer";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "@/model/Login";
export const sendEmail = async ({ email, emailType, userId }) => {
  let hasshedtoken; // Define this outside the first try block

  try {
    // Hash the user ID for the token
    hasshedtoken = await bcrypt.hash(userId.toString(), 10);

    // Update user document with the token and expiry based on emailType
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        VerifyToken: hasshedtoken,
        VerifyTokenExpire: Date.now() + 3600000, // Token expires in 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        ForgotPasswordToken: hasshedtoken,
        ForgotPasswordExpires: Date.now() + 3600000, // Token expires in 1 hour
      });
    }
  } catch (error) {
    console.log("Error in token generation:", error);
  }

  try {
    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f123e8fe85b87e",
        pass: "cd8fb8501b1372",
      },
    });
    const mailOptions = {
      from: '"Moodly" <no-reply@moodly.com>',

      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<b>Click here <a href="http://localhost:3000/">to verify your account</a>. Your token: <p>${hasshedtoken}</p></b>`,
    };

    const sendEmail = await transporter.sendMail(mailOptions);
    return sendEmail;
  } catch (err) {
    console.error("Error in sending email:", err);
  }
};
