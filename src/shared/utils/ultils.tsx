import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React from "react";
import icon_zalo from "@/assets/img/icon_zalo.png";
import Image from "next/image";
import { getTheme } from "./theme/theme";

export const DescriptionDateTime = ({ data }: { data: any }) => {
  const themeData = getTheme();
  return (
    <div
      className="flex items-center gap-1"
      style={{
        color: `${themeData.colorTextSecondary}`,
      }}
    >
      <FontAwesomeIcon icon={faEye} />
      <span className="text-[14px]">
        ngày: {dayjs(data).format("DD/MM/YYYY")}
      </span>
    </div>
  );
};

export const DescriptionTimeViewCount = ({
  data,
  margin,
}: {
  data: any;
  margin?: string;
}) => {
  const themeData = getTheme();
  return (
    <div
      className={`text-[14px] ${
        margin ? margin : "my-2"
      } flex items-center justify-between font-quicksand-semibold`}
    >
      <DescriptionDateTime
        data={data?.displayTime ?? data?.publishTime ?? data?.createTime}
      />
    </div>
  );
};

export type BreadcrumbItemType = { label: string; path?: string };

export function processContent(content: any) {
  if (!content) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  doc.querySelectorAll("img").forEach((img) => {
    const dataSrc = img.getAttribute("data-src");
    if (dataSrc) {
      img.setAttribute("src", dataSrc);
      img.removeAttribute("data-src");
    }
    img.removeAttribute("loading");
  });

  return doc.body.innerHTML;
}

export const ZaloShareButton = () => {
  const handleZaloShare = () => {
    window.open(`https://id.zalo.me/`, "_blank");
  };

  return (
    <button onClick={handleZaloShare}>
      <Image
        src={icon_zalo}
        alt={"icon zalo"}
        width={18}
        height={20}
        className="sm:w-[22px] sm:h-[24px] cursor-pointer"
      />
    </button>
  );
};

export default ZaloShareButton;
