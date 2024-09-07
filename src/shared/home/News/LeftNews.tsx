"use client";
import CardItem from "@/components/card/RSSCardItem";
import { Item } from "@/model/news.model";
import { LatestNews } from "@/service/store/news/news.api";
import { useEffect, useState } from "react";
import { FormCardItem } from "./ViewLayout/form";

interface ILeftNews {
  size?: number;
  vertical?: boolean;
  classname?: string;
  form?: FormCardItem;
  url: string;
  page?: boolean;
}
const LeftNews = (prop: ILeftNews) => {
  const { size, vertical, classname, form, url, page } = prop;
  const [datas, setDatas] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const data = await LatestNews(url);
      setDatas(data);
    };
    getData();
  }, []);

  return (
    <div className={`${classname}`}>
      {(size ? datas?.items?.slice(0, size) : datas?.items)?.map(
        (item: Item, index: number) => {
          return (
            <div
              key={index}
              style={{
                padding: "0 10px",
                marginBottom: "10px",
              }}
            >
              <CardItem
                key={index}
                data={item}
                formCard={form}
                page={page}
                vertical={vertical}
              />
            </div>
          );
        }
      )}
    </div>
  );
};
export default LeftNews;
