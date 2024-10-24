import { MongoClient } from "mongodb";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        // credentials contain the email and password from the form
        const { email, password } = credentials;
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "Content-type": "application/json" },
            }
          );

          if (!Response.ok) {
            // invalid credentials
            return null;
          }

          const parsedResponse = await res.json();

          const accessToken = parsedResponse?.accessToken;
          const refreshToken = parsedResponse?.refreshToken;

          return {
            accessToken,
            refreshToken,
          };
        } catch (e) {
          throw new Error(e.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login/signin",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log(`in jwt callback token is ${JSON.stringify(token)}`);
      // only execute the first time we login
      if (user) {
        console.log(`in jwt callback user is ${JSON.stringify(user)}`);
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }
      // if we have already login
      return token;
    },

    session: async ({ session, token }) => {
      console.log(`in session callback token is ${JSON.stringify(token)}`);
      // if token is still available
      if (token) {
        (session.accessToken = token.accessToken),
          (session.refreshToken = token.refreshToken);
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
