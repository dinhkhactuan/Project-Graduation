"use client";
import CardItem from "@/components/card/RSSCardItem";
import { Item } from "@/model/news.model";
import { LatestNews } from "@/service/news.api";
import { useEffect, useState } from "react";

interface IRightNews {
  size?: number;
  className?: string;
  url: string;
}
const RightNews = (prop: IRightNews) => {
  const { size, className, url } = prop;
  const [datas, setDatas] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const data = await LatestNews(url);
      setDatas(data);
    };
    getData();
  }, []);
  return (
    <div
      className={`${className}`}
      style={{
        padding: "0 10px",
      }}
    >
      {(size ? datas?.items?.slice(0, size) : datas?.items)?.map(
        (item: Item, index: number) => {
          return <CardItem key={index} data={item} page={true} />;
        }
      )}
    </div>
  );
};
export default RightNews;
