import { LatestNews } from "@/service/news.api";
import NewsEvent from "./newsEvent/NewsEvent";
import { TypePage } from "@/service/TypePage";

const PageNews = async () => {
  const rawResult = await LatestNews("tin-noi-bat.rss");
  const result = JSON.parse(JSON.stringify(rawResult));

  return (
    <>
      <NewsEvent
        data={result?.items}
        lang="vi"
        url="tin-moi-nhat.rss"
        type={TypePage.HOT_NEWS}
      />
    </>
  );
};
export default PageNews;
