import type { NextAuthConfig } from "next-auth";

// Edge-safe config — NO Prisma, NO bcrypt. Used by middleware (Edge runtime)
// and spread into the full config in auth.ts.
export const authConfig: NextAuthConfig = {
  // Trust the deployment host (Vercel preview/prod URLs, custom domains, and
  // `next start`). Prevents NextAuth v5 "UntrustedHost" errors.
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/admin/login";

      if (isAdminRoute && !isLoginPage && !isLoggedIn) return false;
      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },
  providers: [],
};
