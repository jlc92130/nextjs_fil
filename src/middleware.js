import { hasCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

//import NextAuth from "next-auth";
//import { authConfig } from "@/auth.config";

//import { getServerSession } from "next-auth";

// Variables
//const { auth } = NextAuth(authConfig);

export async function middleware(request) {
  let isAuthentificated = false;

  //const session = await getServerSession();
  //const session = await auth();
  //console.log(session);

  //const token = request.cookies.get("token")?.value;
  // const cookies = request.headers.cookie;

  //const session = await auth();

  const session = await getToken({
    req: request,

    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(`session: ${session}`);
  // Check if is invited user
  if (hasCookie(("guest", "iamlogged"), { cookies })) {
    isAuthentificated = true;
  }
  // if (token) {
  //   isAuthentificated = true;
  // }

  // Check if connected

  // Check if isAuthenticated
  if (!isAuthentificated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// we redirect the user who is not connected or who has no cookies to login only if he is on the home page
export const config = {
  matcher: ["/"],
};
