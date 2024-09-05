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
        url="giai-tri.rss"
        type={TypePage.ENTERTAINMENT}
      />
    </>
  );
};
export default PageNews;
