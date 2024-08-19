import Parser from "rss-parser";
import { VNEXPRESS } from "@/service/host";

export const LatestNews = async (url: string) => {
  const parser = new Parser();
  try {
    return await parser.parseURL(`${VNEXPRESS}${url}`);
  } catch (error) {
    console.error("Lỗi khi tải RSS:", error);
  }
};
