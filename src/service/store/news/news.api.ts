import { transformDataRss } from "@/shared/utils/ultils";

export const LatestNews = async (url: string) => {
  try {
    const response = await fetch(`/rss/${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();

    return transformDataRss(data?.rss?.channel);
  } catch (error) {
    console.error("Lỗi khi tải RSS:", error);
  }
};
