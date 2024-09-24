import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
  origin: ["https://moodly-mood.vercel.app", "http://localhost:3000", "*"],
});

export const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async (req, res) => {
  await runMiddleware(req, res, cors);
  return res;
};
