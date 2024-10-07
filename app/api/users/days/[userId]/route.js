// pages/api/users/days/[userId].js
import { connect } from "@/config/Dbconfig";
import Day from "@/model/Day";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  await connect();
  const { userId } = params;
  const { days } = await req.json();

  try {
    let dayRecord = await Day.findOne({ userId });
    if (dayRecord) {
      dayRecord.days += days;
      await dayRecord.save();
    } else {
      dayRecord = new Day({ userId, days });
      await dayRecord.save();
    }

    return NextResponse.json({ success: true, days: dayRecord.days });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function GET(req, { params }) {
  await connect(); // Ensure the DB connection is established
  const { userId } = params; // Get userId from URL parameters

  try {
    const dayRecord = await Day.findOne({ userId });
    if (dayRecord) {
      return NextResponse.json({ success: true, days: dayRecord.days });
    } else {
      return NextResponse.json({ success: true, days: 0 }); // No records found
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
