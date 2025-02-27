import NextAuth, { AuthOptions, Session, DefaultSession  } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// 📌 Custom Type สำหรับ Session ให้รองรับ user.id
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
  }
}
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@doe.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("⚠️ กรุณากรอก Email และ Password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      console.log("🔑 JWT Token:", token);
      return token;
    },
    session: async ({ session, token }) => {
      console.log("🛠 Before modifying session:", session);
      
      // ✅ กำหนด `session.user.id` ให้ถูกต้อง
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }

      console.log("✅ After modifying session:", session);
      return session;
    },
  },
};

// ✅ ใช้ API Route Handler ที่รองรับ TypeScript
const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
