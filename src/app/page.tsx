import SlideHome from "@/shared/home/SlideHome";
import RSSFeed from "../components/RSSFeed";
import HeaderHome from "@/shared/home/HeaderHome";
import FooterHome from "@/shared/home/FooterHome";
{
  /* <RSSFeed url="https://vnexpress.net/rss/tin-moi-nhat.rss" /> */
}

export default function Home() {
  return (
    <>
      <SlideHome />
      <HeaderHome />
      <FooterHome />
    </>
  );
}
