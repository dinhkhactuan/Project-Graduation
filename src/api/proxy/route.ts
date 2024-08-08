import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url);
    const data = await response.text();
    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/rss+xml",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSS feed" },
      { status: 500 }
    );
  }
}
