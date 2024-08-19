import { LatestNews } from "@/service/store/news/news.api";
import NewsEvent from "../news/newsEvent/NewsEvent";
import { TypePage } from "@/service/TypePage";

const PageNews = async () => {
  const rawResult = await LatestNews("tin-noi-bat.rss");
  const result = JSON.parse(JSON.stringify(rawResult));

  return (
    <>
      <NewsEvent
        data={result?.items}
        lang="vi"
        url="startup.rss"
        type={TypePage.START_UP}
      />
    </>
  );
};
export default PageNews;
