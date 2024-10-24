import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

const cookie = {
  name: "session",
};

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(180)
    .sign(key);
}

export async function createSession(userId) {
  const expires = new Date(Date.now() + 360);
  const session = await encrypt({ userId, expires });

  cookies().set(cookie.name, session);
}
