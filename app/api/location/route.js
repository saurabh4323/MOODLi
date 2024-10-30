import Location from "@/model/Location";
import { connect } from "@/config/Dbconfig"; // Ensure this connects to MongoDB
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const { userId, latitude, longitude } = await req.json();

    if (!userId || !latitude || !longitude) {
      return new Response("Missing fields", { status: 400 });
    }

    const location = await Location.findOneAndUpdate(
      { userId },
      {
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify(location), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error saving location", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const distance = parseInt(url.searchParams.get("distance")) || 100;
    const { latitude, longitude } = {
      latitude: parseFloat(url.searchParams.get("latitude")),
      longitude: parseFloat(url.searchParams.get("longitude")),
    };

    if (!latitude || !longitude) {
      return new Response("Latitude and longitude are required", {
        status: 400,
      });
    }

    // MongoDB query for locations within the specified distance using geoNear
    const locations = await Location.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },
          distanceField: "distance",
          maxDistance: distance * 1000, // Convert to meters
          spherical: true,
        },
      },
    ]);

    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error fetching locations", { status: 500 });
  }
}
