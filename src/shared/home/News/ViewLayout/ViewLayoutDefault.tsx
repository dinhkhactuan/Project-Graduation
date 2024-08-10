import Banner from "../../Banner";
import CenterNews from "../CenterNews";
import LeftNews from "../LeftNews";
import RightNews from "../RightNews";
import { FormCardItem } from "./form";

const ViewLayoutDefault = () => {
  return (
    <>
      <div
        className="flex gap-2 mt-2"
        style={{ borderBottom: "4px solid #f1f1f1" }}
      >
        <div className="w-1/5	">
          <LeftNews url="thoi-su.rss" size={2} vertical={true} />
        </div>
        <div className="flex-1">
          <CenterNews url="the-gioi.rss" size={1} />
        </div>
        <div className="w-1/4	">
          <RightNews url="kinh-doanh.rss" size={4} />
        </div>
      </div>
      {/* sesson 2 */}
      <div
        className="flex flex-col sm:flex-row gap-2 mt-2 p-2"
        style={{ borderBottom: "4px solid #f1f1f1" }}
      >
        <div className="w-2/6	">
          <LeftNews
            url="giai-tri.rss"
            size={3}
            classname="pr-[10px] md:border-r md:border-gray-200"
            vertical={true}
          />
        </div>
        <div className="w-2/5 ">
          <RightNews
            url="the-thao.rss"
            size={9}
            className="md:border-r md:border-gray-200"
          />
        </div>
        <div className="w-2/7	">
          <Banner
            height={600}
            src="https://cdn.dtadnetwork.com/creatives/html5/202407/1720429575/index.html"
          />
          <div className="mt-[20px]">
            <Banner
              height={300}
              src="https://cdn.dtadnetwork.com/creatives/html5/202408/1723028288/index.html"
            />
          </div>
        </div>
      </div>
      {/* sesson 3 */}
      <div className="flex gap-2 mt-2 p-2">
        <div className="w-1/3	">
          <LeftNews
            url="phap-luat.rss"
            size={6}
            classname="pr-[10px] md:border-r md:border-gray-200"
            vertical={true}
          />
        </div>
        <div className="w-1/3 ">
          <LeftNews
            url="giao-duc.rss"
            size={6}
            classname="pr-[10px] md:border-r md:border-gray-200"
            vertical={true}
          />
        </div>
        <div className="w-1/3	">
          <LeftNews
            url="suc-khoe.rss"
            size={6}
            classname="pr-[10px] md:border-r md:border-gray-200"
            vertical={true}
          />
        </div>
        <div className="w-1/3	">
          <LeftNews
            url="gia-dinh.rss"
            size={6}
            classname="pr-[10px] md:border-r md:border-gray-200"
            vertical={true}
          />
        </div>
      </div>
      {/* sesson 4 */}
      <div
        className="flex gap-2 mt-2"
        style={{ borderBottom: "4px solid #f1f1f1" }}
      >
        <div className="w-1/5	">
          <LeftNews url="du-lich.rss" size={2} vertical={true} />
        </div>
        <div className="flex-1">
          <CenterNews url="khoa-hoc.rss" size={1} />
        </div>
        <div className="w-1/4	">
          <RightNews url="so-hoa.rss" size={4} />
        </div>
      </div>
      {/* sesson5 */}
      <div
        className="flex gap-2 mt-2"
        style={{ borderBottom: "4px solid #f1f1f1" }}
      >
        <div className="w-1/5	">
          <LeftNews url="tin-moi-nhat.rss" size={2} vertical={true} />
        </div>
        <div className="flex-1">
          <CenterNews url="tin-noi-bat.rss" size={1} />
        </div>
        <div className="w-1/4	">
          <RightNews url="tin-xem-nhieu.rss" size={4} />
        </div>
      </div>
      {/* sesson6 */}
      <div className="flex gap-2 mt-2 p-2">
        <div className="w-1/3	">
          <LeftNews
            url="oto-xe-may.rss"
            size={4}
            classname="pr-[10px] md:border-r md:border-gray-200"
            form={FormCardItem.NO_DATE}
          />
        </div>
        <div className="w-1/3 ">
          <LeftNews
            url="y-kien.rss"
            size={4}
            classname="pr-[10px] md:border-r md:border-gray-200"
            form={FormCardItem.NO_DATE}
          />
        </div>
        <div className="w-1/3	">
          <LeftNews
            url="cuoi.rss"
            size={4}
            classname="pr-[10px] md:border-r md:border-gray-200"
            form={FormCardItem.NO_DATE}
          />
        </div>
        <div className="w-1/3	">
          <LeftNews
            url="tam-su.rss"
            size={4}
            classname="pr-[10px] md:border-r md:border-gray-200"
            form={FormCardItem.NO_DATE}
          />
        </div>
      </div>
    </>
  );
};
export default ViewLayoutDefault;
