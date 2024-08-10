"use client";
import CardItem from "@/components/card/RSSCardItem";
import { Item } from "@/model/news.model";
import { LatestNews } from "@/service/news.api";
import { useEffect, useState } from "react";
import { FormCardItem } from "./ViewLayout/form";
import { useRouter } from "next/navigation";

interface ILeftNews {
  size?: number;
  vertical?: boolean;
  classname?: string;
  form?: FormCardItem;
  url: string;
}
const LeftNews = (prop: ILeftNews) => {
  const { size, vertical, classname, form, url } = prop;
  const [datas, setDatas] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const data = await LatestNews(url);
      setDatas(data);
    };
    getData();
  }, []);
  const handleItemClick = (item: Item) => {
    const id = btoa(item.link).replace(/=/g, "");
    router.push(`/news/${id}`);
  };
  return (
    <div className={`${classname}`}>
      {(size ? datas?.items?.slice(0, size) : datas?.items)?.map(
        (item: Item, index: number) => {
          return (
            <div
              onClick={() => handleItemClick(item)}
              style={{
                padding: "0 10px",
                marginBottom: "10px",
              }}
            >
              <CardItem
                key={index}
                data={item}
                formCard={form}
                page="1"
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
