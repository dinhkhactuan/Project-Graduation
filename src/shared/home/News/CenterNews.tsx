"use client";
import CardLargeItem from "@/components/card/RSSCardLargeItem";
import { Item } from "@/model/news.model";
import { LatestNews } from "@/service/store/news/news.api";
import { useEffect, useState } from "react";

interface ICenterNews {
  size?: number;
  url: string;
}
const CenterNews = (prop: ICenterNews) => {
  const { size, url } = prop;
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
      style={{
        padding: "0 20px",
        borderLeft: "1px solid #eee",
        borderRight: "1px solid #eee",
      }}
    >
      {(size ? datas?.items?.slice(0, size) : datas?.items)?.map(
        (item: Item, index: number) => {
          return <CardLargeItem key={index} data={item} />;
        }
      )}
    </div>
  );
};
export default CenterNews;
