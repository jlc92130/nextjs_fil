import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

const key = TextEncoder().encode(process.env.NEXTAUTH_SECRET);

const cookie = {
  name: "session",
};

export async function createSession(userId) {
  const expires = new Date(Date.now() + 360);
  const session = await encrypt({ userId, expires });

  cookies().set(cookie.name, session);
  redirect("/");
}
