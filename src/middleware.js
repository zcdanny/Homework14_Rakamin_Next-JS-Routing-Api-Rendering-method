import { NextResponse } from "next/server";

export function middleware(request) {
  const loginPath = ["/login", "/api/login"];
  if (loginPath.some((v) => v === request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const accessToken = request.cookies.get("accessToken");

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

// determines which path the middleware will implement
export const config = {
  matcher: ["/books/create", "/books/:id/edit", "/books/:id/delete"],
};
