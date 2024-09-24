import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MongoUrl);
    const connect = mongoose.connection;

    connect.on("connected", () => {
      console.log("MongoDB connected");
    });

    connect.on("error", (err) => {
      console.log("Error connecting to MongoDB", err);
      process.exit();
    });
  } catch (error) {
    console.log("There is some error", error);
  }
}
