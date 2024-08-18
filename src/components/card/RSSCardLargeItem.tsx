import { INews, Item } from "@/model/news.model";
import React from "react";
import CustomImage from "../custom/CustomImage";
import { DescriptionDateTime } from "@/shared/utils/ultils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { getTheme } from "@/shared/utils/theme/theme";

type CardLargeItem = {
  data?: Item;
  className?: string;
  page?: boolean;
};

export default function CardLargeItem(props: CardLargeItem) {
  const { data, page = false } = props;
  const themeData = getTheme();

  return (
    <>
      {data && (
        <div className={`card-item cursor-pointer`}>
          <div
            className="w-full shrink-0"
            style={{
              overflow: "hidden",
            }}
          >
            <div
              className="cursor-pointer shrink-0"
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              style={{
                transition: "all 0.3s ease-in-out",
              }}
            >
              <CustomImage src={data?.enclosure?.url || ""} rate={"16:9"} />
            </div>
          </div>
          <div className={`py-[12px] ${page && "px-[14px]"}`}>
            <p
              className="card-title text-ellipsis overflow-hidden md:line-clamp-2 hover:opacity-80 text-[22px] font-quicksand-bold text-hover"
              style={
                {
                  "--hover-color": themeData.colorPrimary,
                  "--color": themeData.colorTextPrimary,
                } as React.CSSProperties
              }
            >
              {data?.title || ""}
            </p>
            <div
              className={
                "text-[14px] my-2 mt-2 flex items-center justify-between font-quicksand-semibold"
              }
            >
              <DescriptionDateTime data={data?.isoDate ?? data?.pubDate} />
              <div className="flex items-center ">
                <FontAwesomeIcon icon={faEye} className={"text-[12px]"} />
                <span className="ml-1">{0}</span>
              </div>
            </div>
            <span
              className={
                "card-desc text-ellipsis overflow-hidden md:line-clamp-3 mt-2 font-quicksand-medium"
              }
            >
              {data?.contentSnippet || ""}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
