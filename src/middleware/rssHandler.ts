import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export function fixImageUrls(data: any, baseUrl: string): any {
  if (Array.isArray(data)) {
    return data.map((item) => fixImageUrls(item, baseUrl));
  } else if (typeof data === "object" && data !== null) {
    const result: any = {};
    for (const key in data) {
      if (key === "enclosure" && data[key].url) {
        result[key] = {
          ...data[key],
          url: new URL(data[key].url, baseUrl).href,
        };
      } else if (key === "image" && typeof data[key] === "string") {
        result[key] = new URL(data[key], baseUrl).href;
      } else {
        result[key] = fixImageUrls(data[key], baseUrl);
      }
    }
    return result;
  }
  return data;
}

export async function handleRSS(sources: Record<string, string>) {
  try {
    const responses = await Promise.all(
      Object.entries(sources).map(async ([key, url]) => {
        const response: Response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from ${url}, Status: ${response.statusText}`
          );
        }

        const contentType: string = response.headers.get("Content-Type") || "";
        let data;

        if (contentType.includes("application/json")) {
          data = await response.json();
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
          data = parser.parse(xmlData);
        } else {
          throw new Error(`Unsupported content type from ${url}`);
        }
        data = fixImageUrls(data, new URL(url).origin);

        return data;
      })
    );

    return NextResponse.json({ data: responses });
  } catch (error) {
    console.error("Error loading RSS feeds:", error);
    return NextResponse.json(
      { error: "Error loading RSS feeds" },
      { status: 500 }
    );
  }
}
