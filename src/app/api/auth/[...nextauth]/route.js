import { MongoClient } from "mongodb";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import jwt from "jsonwebtoken";

//import { createSession } from "@/app/_lib/session";
import { NextResponse } from "next/server";

//import { authConfig } from "../../../../auth.config";

export const authOptions = {
  //...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        // credentials contain the email and password from the form
        const { email, password } = credentials;
        try {
          // connection to mongodb cluster
          const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
          // connect to mongodb database
          const db = client.db(process.env.MONGODB_DATABASE);
          // 1 get the user from db
          // Select the "users" collection
          let user = await db
            .collection("users")
            .find({ email })
            .limit(1)
            .toArray();

          // if email doesn't exist
          if (user.length === 0) {
            await client.close();
            throw new Error("cet utilisateur n existe pas");
          }

          // 2 Verify the password
          const isPasswordValid = await bcrypt.compare(
            password,
            user[0].password
          );
          if (!isPasswordValid) {
            await client.close();
            throw new Error("le mot de passe est incorrect");
          }

          //  3 password valid => the user is authentificated
          user = user.map((user) => ({
            _id: user._id.toString(), // id should be a string
            username: user.username,
            pseudo: user.pseudo,
            email: user.email,
            profile: user.profile,
          }))[0]; // we want to return the first object of the tab user
          await client.close();
          ///////   CREATE SESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSIONNNNNNNNNNNNNNNNNNNNNNNNN

          // CREATE TOKEN DATA
          const tokenData = {
            id: user._id,
            pseudo: user.pseudo,
            email: user.email,
          };
          // create token
          const token = await jwt.sign(tokenData, process.env.NEXTAUTH_SECRET, {
            expiresIn: "1d",
          });

          // console.log("Token:", token);

          const resp = NextResponse.json({
            message: "Login successful",
            success: true,
            token,
          });
          //resp.cookies.set("token", token, { httpOnly: true });

          return resp;
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
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, user, token }) {
      session.user = token.user;

      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

      // Connect to the MongoDB database
      const db = client.db(process.env.MONGODB_DATABASE);

      // Get the user
      let userDB = await db
        .collection("users")
        .find({ email })
        .limit(1)
        .toArray();

      userDB = userDB.map((user) => ({
        _id: user._id.toString(),
        username: user.username,
        pseudo: user.pseudo,
        email: user.email,
        profile: user.profile,
      }))[0];

      // const parsedResponse = await res.json();

      // const accessToken = parsedResponse?.accessToken;
      // const refreshToken = parsedResponse?.refreshToken;

      await client.close();

      return {
        ...session,
        user: {
          ...userDB,
        },
        //accessToken,
        //refreshToken,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
