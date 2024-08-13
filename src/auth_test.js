import { MongoClient } from "mongodb";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

export const {
  handler: { GET, POST },
  auth,
} = NextAuth({
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

          //3 password valid => the user is authentificated
          user = user.map((user) => ({
            _id: user._id.toString(), // id should be a string
            username: user.username,
            pseudo: user.pseudo,
            email: user.email,
            profile: user.profile,
          }))[0]; // we want the first ogject of the tab user
          await client.close();
          return user;
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
      user && (token.user = user); // token has a user variable in which we put user object
      return token;
    },
    async session({ session, user, token }) {
      session.user = token.user; // session has a user variable in which we put the user
      return session;
    },
  },
});
