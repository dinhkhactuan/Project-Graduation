import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RSS_SOURCES_LASTEST_NEWS } from "@/service/host";
import { XMLParser } from "fast-xml-parser";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    const responses = await Promise.all(
      Object.values(RSS_SOURCES_LASTEST_NEWS).map(async (url) => {
        const response: Response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from: ${url}, Status: ${response.statusText}`
          );
        }

        const contentType: string = response.headers.get("Content-Type") || "";

        if (contentType.includes("application/json")) {
          return await response.json();
        } else if (
          contentType.includes("application/xml") ||
          contentType.includes("text/xml")
        ) {
          const xmlData: string = await response.text();

          const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "",
            parseAttributeValue: true,
            allowBooleanAttributes: true,
            trimValues: true,
          });

          return parser.parse(xmlData);
        } else {
          throw new Error(`Unsupported content type from: ${url}`);
        }
      })
    );

    // Xử lý tất cả dữ liệu đã lấy được (responses là một mảng chứa tất cả dữ liệu từ các nguồn)
    return NextResponse.json({ data: responses });
  } catch (error) {
    console.error("Error loading RSS feedsabc:", error);
    return NextResponse.json(
      { error: "Error loading RSS feeds" },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: "/api/rss",
};
