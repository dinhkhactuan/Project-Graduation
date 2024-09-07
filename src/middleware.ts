import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VNEXPRESS } from "@/service/host";
import { XMLParser } from "fast-xml-parser"; // Import fast-xml-parser

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const url: string = request.nextUrl.pathname;

  try {
    if (url) {
      const response: Response = await fetch(`${VNEXPRESS}${url}`);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const contentType: string = response.headers.get("Content-Type") || "";

      if (contentType.includes("application/json")) {
        // Handle JSON response
        const data: unknown = await response.json();
        return NextResponse.json(data);
      } else if (
        contentType.includes("application/xml") ||
        contentType.includes("text/xml")
      ) {
        // Handle XML response
        const xmlData: string = await response.text();

        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "",
          parseAttributeValue: true,
          allowBooleanAttributes: true,
          trimValues: true,
        });
        const jsonData: unknown = parser.parse(xmlData);

        return NextResponse.json(jsonData);
      } else {
        throw new Error(`Unsupported content type: ${contentType}`);
      }
    }
  } catch (error) {
    console.error("Error loading RSS:", error);
    return NextResponse.json({ error: "Error loading RSS" }, { status: 500 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/rss/:path*",
};
