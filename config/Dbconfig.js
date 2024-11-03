import mongoose from "mongoose";

export async function connect() {
  try {
    const mongoUri = process.env.mongourl;
    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Helps handle MongoDB topology changes
      connectTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds for socket timeout
    });

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
