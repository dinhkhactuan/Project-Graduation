import SlideHome from "@/shared/home/SlideHome";
import HeaderHome from "@/shared/home/HeaderHome";
import FooterHome from "@/shared/home/FooterHome";
import ViewLayoutDefault from "@/shared/home/News/ViewLayout/ViewLayoutDefault";

export default function Home() {
  return (
    <>
      <SlideHome />
      <div className="web-container">
        <HeaderHome />
        <ViewLayoutDefault />
      </div>

      <FooterHome />
    </>
  );
}
