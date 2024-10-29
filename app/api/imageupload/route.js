import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Post from "@/model/Post";

cloudinary.config({
  cloud_name: "dinqw15wy",
  api_key: "295145327512886",
  api_secret: "BXZoczX8Wr9jaUIy8S7FjbVBvzQ",
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");
    const userId = formData.get("userId");
    const caption = formData.get("caption");

    if (!imageFile) {
      return NextResponse.json({
        status: 400,
        message: "Image is required",
      });
    }

    // Convert file to base64 format to be compatible with Cloudinary
    const base64Data = await imageFile.arrayBuffer();
    const base64String = Buffer.from(base64Data).toString("base64");

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${base64String}`,
      {
        upload_preset: "moodli",
        folder: `moodliusers/${userId}`,
      }
    );

    // Save post data in MongoDB
    const post = await Post.create({
      userId,
      type: "image",
      imageUrl: uploadResponse.secure_url,
      content: caption,
    });

    return NextResponse.json({
      status: 200,
      message: "Image uploaded and post created successfully",
      post,
    });
  } catch (error) {
    console.error("Error uploading image or saving post:", error);
    return NextResponse.json({
      status: 500,
      message: "Error uploading image or saving post",
    });
  }
}
