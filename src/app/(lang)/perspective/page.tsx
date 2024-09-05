import { LatestNews } from "@/service/store/news/news.api";
import NewsEvent from "../news/newsEvent/NewsEvent";
import { TypePage } from "@/service/TypePage";

const PageNews = async () => {
  const rawResult = await LatestNews("tin-noi-bat.rss");

  return (
    <>
      <NewsEvent
        data={rawResult?.items}
        lang="vi"
        url="gia-dinh.rss"
        type={TypePage.PERSPECTIVE}
      />
    </>
  );
};
export default PageNews;
