import React from "react";
import CustomImage from "../custom/CustomImage";
import { DescriptionTimeViewCount } from "@/shared/utils/ultils";
import { INews } from "@/model/news.model";

type CardItemProps = {
  data?: INews;
  className?: string;
  page?: string;
};

export default function CardItem(props: CardItemProps) {
  const { data, className = "p-0", page } = props;

  return (
    <div
      className={`card-item flex flex-col md:flex-row  items-start justify-center gap-4 cursor-pointer ${className}`}
    >
      <div
        className={`w-full  h-max shrink-0 ${
          page ? "md:w-[120px] xl:w-[100px]" : "md:w-[190px] xl:w-[190px]"
        }`}
        style={{
          overflow: "hidden",
        }}
      >
        <div
          className="cursor-pointer shrink-0"
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          style={{
            transition: "all 0.3s ease-in-out",
          }}
        >
          <CustomImage src={data?.image.link || ""} rate={"4:3"} />
        </div>
      </div>
      <div className="w-full">
        <div className=" text-[16px] card-title text-ellipsis overflow-hidden md:line-clamp-2 font-quicksand-bold text-hover">
          {data?.title || ""}
        </div>
        <div
          className={
            "text-[14px] font-semibold my-1 mt-2 flex items-center justify-between font-quicksand-semibold"
          }
        >
          <DescriptionTimeViewCount data={data?.pubDate} />
        </div>
        <span
          className={`text-[14px] text-ellipsis overflow-hidden md:line-clamp-3 mt-2 font-quicksand-medium ${
            !!page ? "d-none" : ""
          }`}
        >
          {data?.description || ""}
        </span>
      </div>
    </div>
  );
}
