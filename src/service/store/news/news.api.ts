import { transformDataRss } from "@/shared/utils/ultils";

export const LatestNews = async () => {
  try {
    const response = await fetch("/api/rss/latest");

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const { data } = await response.json();

    return data.map((item: any) => transformDataRss(item?.rss?.channel));
  } catch (error) {
    console.error("Lỗi khi tải RSS abc:", error);
  }
};

export const LatestNews_New = async () => {
  try {
    const response = await fetch("/api/rss/news");

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const { data } = await response.json();
    console.log(data);

    return data.map((item: any) => transformDataRss(item?.rss?.channel));
  } catch (error) {
    console.error("Lỗi khi tải RSS abc:", error);
  }
};
