import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

export function middleware(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    pathname.includes("/static/") ||
    pathname.match(/\.[^/]+$/)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (!isLocale(firstSegment ?? "")) {
    const redirectPath = ["", defaultLocale, ...segments].join("/");
    url.pathname = redirectPath || `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*"
};
