import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider ({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    session: async (session: any, user: any, sessionToken: any) => {
      return session.user;
    }
  }
}

export default NextAuth(authOptions)
