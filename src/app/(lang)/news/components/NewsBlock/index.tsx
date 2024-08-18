"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { VNEXPRESS } from "@/service/host";
import CustomImage from "@/components/custom/CustomImage";
import { DescriptionDateTime } from "@/shared/utils/ultils";
import { ArticleData } from "../../[id]/page";
import { LatestNews } from "@/service/news.api";
import { Item } from "@/model/news.model";
import { getTheme } from "@/shared/utils/theme/theme";

type MostReadNewsProps = {
  url: string;
  heading: string;
};

export default function MostReadNews(props: MostReadNewsProps) {
  const { url, heading } = props;
  const [dataList, setDataList] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await LatestNews(url);

      setDataList(data?.items);
    };
    getData();
  }, []);
  const themeData = getTheme();
  return (
    <div
      className="p-[16px]"
      style={{ backgroundColor: themeData.colorInfoBg }}
    >
      <div>
        <p
          className="pb-[10px] font-bold"
          style={{ color: themeData.colorPrimary }}
        >
          {heading}
        </p>
      </div>
      <div className="flex flex-col items-start gap-3">
        {dataList?.length > 0 ? (
          dataList?.slice(0, 5)?.map((ele: Item, index: number) => (
            <div key={index} className="flex gap-2 grow w-full">
              <div
                className="w-[100px] shrink-0"
                style={{
                  overflow: "hidden",
                }}
              >
                <div
                  className="cursor-pointer shrink-0"
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  style={{
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <CustomImage src={ele?.enclosure?.url || ""} rate={"16:9"} />
                </div>
              </div>
              <div className="grow w-full">
                <p
                  className="text-[14px] cursor-pointer font-semibold overflow-hidden md:line-clamp-3 text-hover"
                  style={
                    {
                      "--color": themeData.colorTextPrimary,
                      "--hover-color": themeData.colorPrimary,
                    } as React.CSSProperties
                  }
                >
                  {ele?.title}
                </p>
                <div
                  className={
                    "text-[12px] flex items-center justify-between font-quicksand-semibold"
                  }
                >
                  <DescriptionDateTime data={ele.isoDate} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-[14px] w-full text-center">không có dữ liệu</div>
        )}
      </div>
    </div>
  );
}
