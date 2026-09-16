import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Check if accessing admin subdomain
  const isAdminSubdomain = hostname.startsWith("admin.") || hostname === "admin.gqtech.in";
  const isInternshipSubdomain = hostname.startsWith("internships.") || hostname === "internships.gqtech.in";

  if (isAdminSubdomain) {
    // If request does not already start with /admin, rewrite internally
    if (!url.pathname.startsWith("/admin") && !url.pathname.startsWith("/api")) {
      url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Prevent admin routes from being accessible if explicitly on the internships portal domain in production
  if (isInternshipSubdomain && url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
