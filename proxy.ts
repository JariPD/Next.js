import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextAuthRequest } from "next-auth";

// proxy.ts runs in Node.js runtime (Next.js 16), so we can import auth from
// auth.ts directly — no Edge-safe split config needed. Using the same auth
// instance that issued the cookie guarantees correct token decoding.

export default auth(function proxy(req: NextAuthRequest) {
  const path = req.nextUrl.pathname;
  const session = req.auth;

  // Protected routes: require login
  if (path.startsWith("/dashboard") || path.startsWith("/blog/new")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Admin routes: require admin role
  if (path.startsWith("/admin")) {
    if ((session?.user as { role?: string } | undefined)?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
