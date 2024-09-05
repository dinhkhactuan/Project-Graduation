import { LatestNews } from "@/service/store/news/news.api";
import NewsEvent from "./newsEvent/NewsEvent";
import { TypePage } from "@/service/TypePage";

const PageNews = async () => {
  const rawResult = await LatestNews("tin-noi-bat.rss");

  return (
    <>
      <NewsEvent
        data={rawResult?.items}
        lang="vi"
        url="tin-moi-nhat.rss"
        type={TypePage.HOT_NEWS}
      />
    </>
  );
};
export default PageNews;
