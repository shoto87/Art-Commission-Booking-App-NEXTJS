import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token?.role);

    // Allow access only if the role is "Artist" or "user"
    if (
      req.nextUrl.pathname.startsWith("/TicketPage/new") &&
      !["Artist", "user"].includes(req.nextauth.token?.role)
    ) {
      return NextResponse.redirect(new URL("/Denied", req.url));
    }
  },
  {
    callbacks: {
      // The `authorized` callback ensures that the token exists
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/TicketPage/new"] };
