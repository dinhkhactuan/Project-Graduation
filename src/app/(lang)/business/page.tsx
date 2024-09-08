import { LatestNews } from "@/service/store/news/news.api";
import NewsEvent from "../news/newsEvent/NewsEvent";
import { TypePage } from "@/service/TypePage";

const PageNews = async () => {
  const rawResult = await LatestNews();

  return (
    <>
      <NewsEvent
        data={rawResult?.items}
        lang="vi"
        url="kinh-doanh.rss"
        type={TypePage.BUSINESS}
      />
    </>
  );
};
export default PageNews;
