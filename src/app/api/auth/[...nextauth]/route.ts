import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProivder from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
const authOptions: NextAuthOptions = {
    providers: [
        GoogleProivder({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user?.email) {
                throw new Error("No profile")
            }
            const userRow = await prisma.user.findUnique({
                where: {
                    author_email: user.email
                }
            })
            if (!userRow) {
                await prisma.user.create({
                    data: {
                        author_name: user.name || "",
                        author_email: user.email,
                        author_pfp: user.image
                    }
                })
            }
            return true
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };