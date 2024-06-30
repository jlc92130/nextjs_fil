import { NextResponse } from "next/server";
import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";

export function middleware(request) {
  let isAuthentificated = false;

  if (hasCookie("guest", { cookies })) {
    isAuthentificated = true;
  }
  if (!isAuthentificated) {
    //Redirect to login
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
    console.log(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
