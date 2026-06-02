import { NextRequest, NextResponse } from "next/server";

// Public routes
const publicRoutes = ["/login", "/forgot", "/reset-password"];

// Check public route
function isPublicRoute(pathname: string) {
  return publicRoutes.includes(pathname);
}

export function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  /*
    NEXTAUTH COOKIES
  */
  const token =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const publicRoute = isPublicRoute(pathname);

  console.log("PATH:", pathname);
  console.log("TOKEN EXISTS:", !!token);

  /*
    HANDLE ROOT "/"
  */
  if (pathname === "/") {

    // Logged in
    if (token) {
      return NextResponse.redirect(
        new URL("/home", request.url)
      );
    }

    // Not logged in
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  /*
    USER NOT LOGGED IN
    trying private route
  */
  if (!token && !publicRoute) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  /*
    USER LOGGED IN
    trying public route
  */
  if (token && publicRoute) {

    return NextResponse.redirect(
      new URL("/home", request.url)
    );
  }

  /*
    ALLOW REQUEST
  */
  return NextResponse.next();
}

/*
  RUN MIDDLEWARE ON ROUTES
*/
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
