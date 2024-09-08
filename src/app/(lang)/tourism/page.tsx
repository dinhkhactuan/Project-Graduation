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
        url="du-lich.rss"
        type={TypePage.TOURISM}
      />
    </>
  );
};
export default PageNews;
