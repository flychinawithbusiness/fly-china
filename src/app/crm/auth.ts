import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Separate base path + cookie so the CRM session is fully independent
  // of the admin (/api/auth) NextAuth instance.
  basePath: "/crm/api/auth",
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const employee = await prisma.crmEmployee.findUnique({
          where: { email },
        });
        if (!employee || !employee.isActive) return null;

        const valid = await bcrypt.compare(password, employee.password);
        if (!valid) return null;

        return {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          role: employee.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as unknown as Record<string, unknown>).role =
          token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/crm/login" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  cookies: {
    sessionToken: {
      name: "crm-authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
