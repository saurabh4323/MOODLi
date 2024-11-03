// import mongoose from "mongoose";
// import { connect } from "../config/Dbconfig.js";
// import Post from "../model/Post.js";

// const samplePosts = [
//   // Text posts about life
//   {
//     userId: "67277d428f30455d97f56772",
//     type: "text",
//     content: "Life is a journey, filled with beautiful moments and challenges.",
//   },
//   {
//     userId: "67277d418f30455d97f5676a",
//     type: "text",
//     content: "Happiness comes from appreciating the little things in life.",
//   },

//   {
//     userId: "67277d418f30455d97f56770",
//     type: "text",
//     content: "Life is short. Smile while you still have teeth!",
//   },
//   {
//     userId: "67277d418f30455d97f5676c",
//     type: "text",
//     content:
//       "If we aren't supposed to eat midnight snacks, why is there even a light in the fridge?",
//   },

//   // Image posts with sample Cloudinary URLs
//   {
//     userId: "67277d428f30455d97f5676e",
//     type: "image",
//     imageUrl:
//       "https://res.cloudinary.com/dinqw15wy/image/upload/v1/sample1.jpg",
//   },
//   {
//     userId: "67277d418f30455d97f5676c",
//     type: "image",
//     imageUrl:
//       "https://res.cloudinary.com/dinqw15wy/image/upload/v1/sample2.jpg",
//   },
//   {
//     userId: "67277d418f30455d97f56768",
//     type: "image",
//     imageUrl:
//       "https://res.cloudinary.com/dinqw15wy/image/upload/v1/sample3.jpg",
//   },
//   {
//     userId: "67277d418f30455d97f5675e",
//     type: "image",
//     imageUrl:
//       "https://res.cloudinary.com/dinqw15wy/image/upload/v1/sample4.jpg",
//   },
//   {
//     userId: "67277d418f30455d97f56756",
//     type: "image",
//     imageUrl:
//       "https://res.cloudinary.com/dinqw15wy/image/upload/v1/sample5.jpg",
//   },
//   {
//     userId: "67277d418f30455d97f56752",
//     type: "image",
//     imageUrl:
//       "https://res.cloudinary.com/dinqw15wy/image/upload/v1/sample6.jpg",
//   },
// ];

// const run = async () => {
//   await connect(); // Connect to MongoDB

//   try {
//     await Post.insertMany(samplePosts);
//     console.log("Sample posts created successfully");
//   } catch (error) {
//     console.error("Error creating sample posts:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// run();
