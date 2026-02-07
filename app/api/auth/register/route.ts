import { NextRequest, NextResponse } from "next/server";
import users from "@/lib/models/UserModel";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  console.log("Inside Register api");
  
  try {
    await connectDB();
    const reqBody = await req.json();
    const { email } = reqBody;
    const existingUser = await users.findOne({ email });

    console.log(existingUser);
    

    if (existingUser) {
      return NextResponse.json(
        { error: "User exists! Try using a different email." },
        { status: 400 },
      );
    } else {
      const newUser = await users.create(reqBody);
      //send response to client
      return NextResponse.json(newUser, { status: 201 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}
