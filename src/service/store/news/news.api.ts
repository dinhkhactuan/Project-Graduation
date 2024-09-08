import { transformDataRss } from "@/shared/utils/ultils";

export const LatestNews = async () => {
  try {
    const response = await fetch("/api/rss");

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const { data } = await response.json();
    console.log(data);

    // Bạn có thể cần xử lý lại dữ liệu trả về từ tất cả các nguồn trước khi sử dụng
    return data.map((item: any) => transformDataRss(item?.rss?.channel));
  } catch (error) {
    console.error("Lỗi khi tải RSS abc:", error);
  }
};
