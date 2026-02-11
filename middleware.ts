import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")
  console.log("Inside middleware***************");
  console.log(token);
  
  if (!token && req.nextUrl.pathname.startsWith("/journals")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher : ["/journals/:path*", "/journal/:path*"],
}
