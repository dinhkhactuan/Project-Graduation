import { LatestNews } from "@/service/store/news/news.api";
import NewsEvent from "./newsEvent/NewsEvent";
import { TypePage } from "@/service/TypePage";
import { processRSSData } from "@/shared/utils/ultils";

const PageNews = async () => {
  const data = await LatestNews();
  const processedData = processRSSData(data);

  return (
    <>
      <NewsEvent
        data={data}
        lang="vi"
        url="tin-moi-nhat.rss"
        type={TypePage.HOT_NEWS}
      />
    </>
  );
};
export default PageNews;
