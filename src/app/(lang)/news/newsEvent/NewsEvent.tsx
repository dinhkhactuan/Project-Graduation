"use client";
import { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import { LatestNews } from "@/service/store/news/news.api";
import { TypePage } from "@/service/TypePage";
import CardItem from "@/components/card/RSSCardItem";
import MostReadNews from "../components/NewsBlock";
import CardLargeItem from "@/components/card/RSSCardLargeItem";
import { Item } from "rss-parser";
import { HeadingPage } from "@/shared/utils/ultils";
import { useTheme } from "@/app/(provider)/ThemeProvider";

const { Title } = Typography;

type NewsEventProps = {
  data: any;
  type: TypePage;
  lang: string;
  url: string;
};

export default function NewsEvent({ data, type, lang, url }: NewsEventProps) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [dataList, setDataList] = useState<any>([]);
  const [totalElements, setTotalElements] = useState<number>(0);

  const { themeData, setCurrentTheme } = useTheme();

  const mappingPostTitle: { [key in TypePage]: string } = {
    [TypePage.THOISU]: "Thời sự",
    [TypePage.WORLD]: "Thế giới",
    [TypePage.PERSPECTIVE]: "Góc nhìn",
    [TypePage.BUSINESS]: "Kinh doanh",
    [TypePage.SPORT]: "Thể thao",
    [TypePage.LIFE]: "Đời sống",
    [TypePage.ENTERTAINMENT]: "Giải trí",
    [TypePage.CONFIDE]: "Tâm sự",
    [TypePage.EDUCATION]: "Giáo dục",
    [TypePage.SCIENCE]: "Khoa học",
    [TypePage.START_UP]: "Start up",
    [TypePage.TOURISM]: "Du lịch",
    [TypePage.NEWS]: "Tin tức",
    [TypePage.HOT_NEWS]: "Tin nổi bật",
    [TypePage.MOST_VIEW_NEWS]: "Tin đọc nhiều nhất",
    [TypePage.LATEST_NEWS]: "Tin mới nhất",
  };

  useEffect(() => {
    const getData = async () => {
      const result = await LatestNews(url);
      setDataList(result);
      // setTotalElements(result.totalElements);
    };
    getData();
  }, [url]);

  return (
    <div className="container news-event-layout mt-2">
      <div>
        <HeadingPage
          // icon={mappingPostIcon[type]}
          title={mappingPostTitle[type]}
          breadcrumb={[{ label: mappingPostTitle[type], path: `/${type}` }]}
        />
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={12}>
          <div style={{ backgroundColor: themeData.colorInfoBg }}>
            <CardLargeItem page={true} data={data?.[0]} />
          </div>
        </Col>
        <Col lg={12}>
          <Row gutter={[0, 0.5]}>
            {data?.slice?.(1, 4)?.map((ele: Item, index: number) => (
              <Col span={24} key={index}>
                <CardItem
                  page={true}
                  horizontalLines={false}
                  data={ele as any}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} lg={16}>
          {dataList?.items?.slice(0, 10)?.map?.((ele: Item, index: number) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <CardItem horizontalLines={false} data={ele as any} />
            </div>
          ))}
          {/* <Pagination
            current={page}
            pageSize={pageSize}
            total={totalElements}
            onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            style={{ textAlign: "center", marginTop: "16px" }}
          /> */}
        </Col>
        <Col xs={24} lg={8}>
          <div className="mb-4">
            <MostReadNews url="tin-moi-nhat.rss" heading="Tin mới nhất" />
          </div>
          <MostReadNews url="tin-xem-nhieu.rss" heading="Tin xem nhiều" />
        </Col>
      </Row>
    </div>
  );
}
