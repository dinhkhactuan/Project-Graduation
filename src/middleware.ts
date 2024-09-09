import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RSS_SOURCES_NEWS, RSS_SOURCES_LASTEST_NEWS } from "./service/host";
import { handleRSS } from "./middleware/rssHandler";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/rss/latest") {
    return handleRSS(RSS_SOURCES_LASTEST_NEWS);
  } else if (pathname === "/api/rss/news") {
    return handleRSS(RSS_SOURCES_NEWS);
  }

  // Thêm các điều kiện khác cho các danh mục RSS khác nếu cần

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/rss/:path*"],
};
