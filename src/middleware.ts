import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

// Edge-safe admin auth (no Prisma/bcrypt — those live in auth.ts).
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // CRM: gate on presence of the CRM session cookie. Full verification
  // happens in the /crm pages via the CRM auth() instance. Exclude the CRM
  // auth API routes so login (csrf/callback) can run before the cookie exists.
  if (
    pathname.startsWith("/crm") &&
    pathname !== "/crm/login" &&
    !pathname.startsWith("/crm/api")
  ) {
    const crmCookie =
      req.cookies.get("crm-authjs.session-token") ||
      req.cookies.get("__Secure-crm-authjs.session-token");
    if (!crmCookie) {
      return NextResponse.redirect(new URL("/crm/login", req.url));
    }
  }

  // Admin: req.auth is the admin session decoded from authjs.session-token.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/crm/:path*"],
};
