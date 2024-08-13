import { hasCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
//import { auth } from "./app/api/auth/[...nextauth]/route";

//import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//import { getServerSession } from "next-auth";

export function middleware(request) {
  let isAuthentificated = false;
  // const session = await getServerSession(authOptions);

  //const session = await auth();
  // Check if is invited user
  if (hasCookie("guest", { cookies })) {
    isAuthentificated = true;
  }
  // if (session) {
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
