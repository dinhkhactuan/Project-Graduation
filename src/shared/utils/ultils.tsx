import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";

export const DescriptionDateTime = ({ data }: { data: any }) => {
  return (
    <div className="flex items-center gap-1">
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
  return (
    <div
      className={`text-[14px] ${
        margin ? margin : "my-2"
      } flex items-center justify-between font-quicksand-semibold`}
    >
      <DescriptionDateTime
        data={data?.displayTime ?? data?.publishTime ?? data?.createTime}
      />
      <div>
        <FontAwesomeIcon icon={faEye} />
        <span className="ml-1 text-[14px]">{data?.viewCount || 0}</span>
      </div>
    </div>
  );
};

export type BreadcrumbItemType = { label: string; path?: string };
