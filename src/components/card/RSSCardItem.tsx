import React from "react";
import CustomImage from "../custom/CustomImage";
import { DescriptionTimeViewCount } from "@/shared/utils/ultils";
import { INews, Item } from "@/model/news.model";
import { FormCardItem } from "@/shared/home/News/ViewLayout/form";
import { useTheme } from "@/app/ThemeProvider";

type CardItemProps = {
  data: Item;
  className?: string;
  vertical?: boolean;
  formCard?: FormCardItem;
  horizontalLines?: boolean;
  page?: boolean;
};

export default function CardItem(props: CardItemProps) {
  const {
    data,
    className = "p-0",
    page = false,
    horizontalLines = true,
    vertical,
    formCard,
  } = props;
  const { themeData, setCurrentTheme } = useTheme();

  return (
    <div
      style={{ borderBottom: `${horizontalLines ? "1px solid #eee" : ""}` }}
      className={`card-item flex ${
        vertical
          ? "flex-col "
          : "flex-col sm:flex-col md:flex-row lg:flex-row mb-[12px]"
      } ${formCard === FormCardItem.COL_REVERSE && "flex-col-reverse"} 
      ${
        formCard === FormCardItem.ROW_REVERSE && "flex-row-reverse"
      }items-start justify-center gap-3 cursor-pointer ${className}`}
    >
      <div
        className={`w-full  h-full shrink-0 ${
          !vertical ? "md:w-[120px] xl:w-[100px]" : "w-full  h-full"
        } ${page && "md:w-[190px] xl:w-[190px]"}`}
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
          <CustomImage
            src={data?.enclosure?.url || ""}
            rate={vertical ? "16:9" : "4:3"}
          />
        </div>
      </div>
      <div className="w-full">
        <div
          className="text-[16px] font-bold overflow-hidden md:line-clamp-2 text-hover"
          style={
            {
              "--hover-color": themeData.colorPrimary,
              "--color": themeData.colorTextPrimary,
            } as React.CSSProperties
          }
        >
          {data?.title || ""}
        </div>
        {formCard === FormCardItem.NO_DATE ? (
          <></>
        ) : (
          <div
            className={
              "text-[14px] font-semibold flex items-center justify-between font-quicksand-semibold"
            }
          >
            <DescriptionTimeViewCount data={data?.isoDate} />
          </div>
        )}
        <span
          className={`text-[14px] text-ellipsis overflow-hidden md:line-clamp-3 font-quicksand-medium `}
        >
          {data?.contentSnippet || ""}
        </span>
      </div>
    </div>
  );
}
