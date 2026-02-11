import { NextRequest, NextResponse } from "next/server";
import users from "@/lib/models/UserModel";
import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      if (password == existingUser.password) {
        const token = signToken({ userMail: existingUser.email, userName: existingUser.name });
        const response = NextResponse.json(
          { user: existingUser, token },
          { status: 200 },
        );
        response.cookies.set("token", token, { httpOnly: true, path: "/" });
        return response;
      } else {
        return NextResponse.json(
          { error: "Incorrect Email or Password!!" },
          { status: 401 },
        );
      }
    } else {
      return NextResponse.json(
        { error: "Something went wrong. Please try again!" },
        { status: 404 },
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}
