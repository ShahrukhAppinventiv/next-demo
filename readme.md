import { NextRequest, NextResponse } from "next/server";

// Public routes
const publicRoutes = ["/login"];

// Helper function
function isPublicRoute(pathname: string) {
  return publicRoutes.includes(pathname);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // const token = request.cookies.get("token")?.value;
  const token =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  console.log("PATH:", pathname);
  console.log("TOKEN EXISTS:", !!token);

  const publicRoute = isPublicRoute(pathname);

  /*
    HANDLE ROOT "/"
  */
  if (pathname === "/") {
    // Logged in
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Not logged in
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /*
    NOT LOGGED IN
    trying private route
  */
  if (!token && !publicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /*
    LOGGED IN
    trying public route
  */
  if (token && publicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Run proxy on routes
export const config = {
  matcher: [
    /*
      Skip:
      - api
      - next internals
      - static files
    */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
