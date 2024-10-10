import Friend from "@/model/friendSchema";
import { connect } from "@/config/Dbconfig";

await connect();
export async function GET(req) {
  const { userId } = req.query; // Get userId from the request
  try {
    const friends = await getFriends(userId); // Replace with your logic to get friends
    return new Response(JSON.stringify(friends), { status: 200 });
  } catch (error) {
    console.error("Error retrieving friend list:", error);
    return new Response("Error retrieving friend list", { status: 500 });
  }
}
