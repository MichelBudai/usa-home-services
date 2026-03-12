import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "localhost:3000";
  const response = NextResponse.next();
  response.headers.set("x-hostname", hostname);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-priority.xml).*)",
  ],
};
