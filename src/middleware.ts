import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile"];
const guestOnlyRoutes = ["/register", "/users"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("tokken")?.value;
  const { pathname } = req.nextUrl;

  console.log("💡 Token:", token);
  console.log("💡 Path:", pathname);

  const user = token;

  if (!user && protectedRoutes.some((route) => pathname.startsWith(route))) {
    console.log("🔐 Redirecting to /register");
    return NextResponse.redirect(new URL("/register?api=true", req.url));
  }
  if (user && guestOnlyRoutes.some((route) => pathname.startsWith(route))) {
    console.log(
      "👤 Logged-in user trying to access /register → Redirecting to /profile/cart"
    );
    return NextResponse.redirect(new URL("/profile", req.url));
  } else {
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/register", "/profile"],
};
