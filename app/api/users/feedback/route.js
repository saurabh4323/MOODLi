import mongoose from "mongoose";
import Feed from "@/model/Feedback";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";
connect();

export async function POST(req) {
  try {
    const reqbody = await req.json();
    const { name, feedback } = reqbody;
    console.log("got", reqbody);

    const feedbacks = new Feed({ name, feedback });
    const feedsave = feedbacks.save();
    return NextResponse.json({
      message: "Feedback saved successfully",
      feedsave,
    });
  } catch (error) {
    console.log(error);
  }
}
