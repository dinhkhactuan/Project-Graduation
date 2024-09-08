// app/api/proxy-image/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing URL parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch image");

    const contentType = response.headers.get("content-type");
    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType || "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);
    return NextResponse.json(
      { error: "Failed to proxy image" },
      { status: 500 }
    );
  }
}
