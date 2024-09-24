// lib/cors.js
import Cors from "cors";

// Helper method to run middleware
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

// Initialize the CORS middleware
const cors = Cors({
  origin: ["https://moodly-mood.vercel.app", "http://localhost:3000"], // Add your allowed origins
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable credentials (cookies/auth headers)
});

export default cors;
