import { LatestNews, LatestNews_New } from "@/service/store/news/news.api";
import NewsEvent from "./newsEvent/NewsEvent";
import { TypePage } from "@/service/TypePage";
import { processRSSData } from "@/shared/utils/ultils";

const PageNews = async () => {
  const data = await LatestNews_New();
  const processedData = processRSSData(data);
  console.log(processedData);

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
