// lib/cors.js
import Cors from "cors";

// Initialize the CORS middleware
const cors = Cors({
  origin: "https://moodly-mood.vercel.app", // Allowed origin
  methods: ["GET", "HEAD", "POST"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Enable if you want to allow cookies or credentials
});

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
