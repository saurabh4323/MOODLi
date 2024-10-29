// import mongoose from "mongoose";
// import { connect } from "../config/Dbconfig.js"; // Adjust the path based on your project structure
// import User from "../model/Login.js"; // Adjust the path based on your project structure
// import Profile from "../model/Profile.js"; // Adjust the path based on your project structure
// connect();
// // List of names for 20 users
// const names = [
//   "Aditi",
//   "Priya",
//   "Ananya",
//   "Kavya",
//   "Sneha",
//   "Meera",
//   "Pooja",
//   "Riya",
//   "Neha",
//   "Simran",
//   "Arjun",
//   "Ravi",
//   "Siddharth",
//   "Karan",
//   "Vikram",
//   "Rohit",
//   "Aman",
//   "Harsh",
//   "Sameer",
//   "Varun",
// ];

// // List of bios for users
// const bios = [
//   "Coffee lover adventure seeker cat mom",
//   "Bookworm yoga enthusiast dessert connoisseur",
//   "Wanderlust-driven always planning big trips",
//   "Music junkie crafting queen beach dreamer",
//   "Plant parent movie buff pizza fanatic",
//   "Fitness freak chocolate lover doggo friend",
//   "Travel addict foodie explorer road tripper",
//   "Art lover nature explorer ice cream",
//   "Tech geek coffee addict late-night snack",
//   "Fashionista selfie queen always up adventures",
//   "Gamer comic book nerd pizza lover",
//   "Music buff football fanatic world traveler",
//   "Tech enthusiast coffee snob movie marathoner",
//   "Gym lover foodie explorer karaoke champion",
//   "Adventure seeker travel addict trivia guru",
//   "Photography lover cooking enthusiast dog dad",
//   "Sports buff gaming enthusiast weekend road tripper",
//   "Nature lover hiking addict weekend BBQ master",
//   "Fashion lover beauty guru always Instagram",
//   "Craft beer enthusiast movie buff late-night snack",
// ];

// // Generate sample user data based on provided names
// const sampleUsers = names.map((name, index) => ({
//   name,
//   email: `user${index + 1}@example.com`, // Unique email for each user
//   password: `password${index + 1}`, // Remember to hash passwords in production
//   bio: bios[index], // Assigning a unique bio from the list
// }));

// const createUsersAndProfiles = async () => {
//   try {
//     for (const userData of sampleUsers) {
//       // Create user
//       const user = await User.create(userData);

//       // Create profile associated with the user
//       const profileData = {
//         userId: user._id,
//         email: user.email,
//         name: user.name,
//         favoriteEmoji: "😊", // Default emoji
//         bio: userData.bio, // Use the bio from userData
//         phoneNumber: `1${Math.floor(100000000 + Math.random() * 900000000)}`, // Generates a random 10-digit number
//         gender: ["Male", "Female", "Other"][Math.floor(Math.random() * 3)], // Random gender
//       };

//       await Profile.create(profileData);
//     }

//     console.log("Users and profiles created successfully");
//   } catch (error) {
//     console.error("Error creating users and profiles:", error);
//   } finally {
//     mongoose.disconnect(); // Disconnect from the database
//   }
// };

// const run = async () => {
//   await connect(); // Connect to MongoDB
//   await createUsersAndProfiles(); // Create users and profiles
// };

// run();
