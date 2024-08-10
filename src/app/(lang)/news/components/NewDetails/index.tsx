"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import fontLarge from "@/assets/img/font-adjustment.png";
import fontMedium from "@/assets/img/font-size-medium.png";
import fontSmall from "@/assets/img/font-size.png";
import lineLarge from "@/assets/img/line-large.png";
import lineMedium from "@/assets/img/line-medium.png";
import lineSmall from "@/assets/img/line-small.png";
import contrastLarge from "@/assets/img/contrast-large.png";
import contrastSmall from "@/assets/img/contrast-small.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { INews } from "@/model/news.model";
import { DescriptionTimeViewCount } from "@/shared/utils/ultils";
import { ArticleData } from "../../[id]/page";
import DOMPurify from "dompurify";
import MostReadNews from "../NewsBlock";

const FONT_SIZE = 0;
const LINE_HEIGHT = 0;
const BACKGROUND = 255;

interface NewDetailsProps {
  icon?: () => ReactNode;
  title?: string;
  newData?: ArticleData;
}

export default function NewDetails(props: NewDetailsProps) {
  const { newData, title } = props;

  const [currentUrl, setCurrentUrl] = useState("");

  const [fontSize, setFontSize] = useState(FONT_SIZE);
  const [lineHeight, setLineHeight] = useState(LINE_HEIGHT);
  const [background, setBackground] = useState(BACKGROUND);
  const audioRef: any = useRef(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    return () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []);

  return (
    <>
      {!!newData ? (
        <>
          <div className={"web-container page-details mt-[30px]"}>
            <div className="mb-[38px]"></div>
            <div style={{ position: "relative" }}>
              <div className={"flex flex-row mb-4"}>
                <div
                  className="flex flex-col sm:w-full lg:w-2/3"
                  style={{
                    background: `rgb(${background}, ${background}, ${background})`,
                  }}
                >
                  <div className="d-flex gap-3 items-center relative">
                    <div
                      className="title-details font-quicksand-bold text-[20px] lg:text-[28px]"
                      style={{
                        lineHeight: 1.5 + lineHeight,
                      }}
                    >
                      {newData?.title || ""}
                    </div>
                  </div>
                  <div className="mb-3">
                    <DescriptionTimeViewCount data={newData} />
                  </div>
                  <div className="flex items-center sm:justify-center lg:justify-between gap-2 flex-wrap mb-2">
                    <div className={"mb-2 w-[400px] lg:w-1/2"}>
                      <audio
                        ref={audioRef}
                        controls
                        className={"h-[40px] w-full"}
                      >
                        <source
                          //   src={newData?.linkTextToSpeech}
                          type="audio/mp3"
                        />
                      </audio>
                    </div>
                    <div className="inline-flex items-center justify-center flex-wrap gap-2 p-1 border-1 rounded mb-2">
                      <div
                        className="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-[#ccc]"
                        onClick={() => {
                          setFontSize(fontSize + 4);
                        }}
                      >
                        <Image
                          src={fontLarge}
                          alt={"font"}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div
                        className="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-[#ccc]"
                        onClick={() => {
                          setFontSize(FONT_SIZE);
                        }}
                      >
                        <Image
                          src={fontMedium}
                          alt={"font"}
                          width={16}
                          height={16}
                        />
                      </div>
                      <div
                        className="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-[#ccc]"
                        onClick={() => {
                          setFontSize(fontSize - 4);
                        }}
                      >
                        <Image
                          src={fontSmall}
                          alt={"font"}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div
                        className="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-[#ccc]"
                        onClick={() => {
                          setLineHeight(lineHeight + 0.2);
                        }}
                      >
                        <Image
                          src={lineLarge}
                          alt={"font"}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div
                        className="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-[#ccc]"
                        onClick={() => {
                          setLineHeight(LINE_HEIGHT);
                        }}
                      >
                        <Image
                          src={lineMedium}
                          alt={"font"}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div
                        className="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-[#ccc]"
                        onClick={() => {
                          setLineHeight(lineHeight - 0.2);
                        }}
                      >
                        <Image
                          src={lineSmall}
                          alt={"font"}
                          width={28}
                          height={28}
                        />
                      </div>
                      <div
                        className="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-[#ccc]"
                        onClick={() => {
                          setBackground(background + 9);
                        }}
                      >
                        <Image
                          src={contrastLarge}
                          alt={"font"}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div
                        className="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-[#ccc]"
                        onClick={() => {
                          setBackground(background - 9);
                        }}
                      >
                        <Image
                          src={contrastSmall}
                          alt={"font"}
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="desc-new my-[15px] text-justify">
                    <strong>
                      <i>{newData?.description}</i>
                    </strong>
                  </div>
                  <div
                    className={"font-quicksand-medium content-new"}
                    style={{
                      fontSize: 16 + fontSize,
                      lineHeight: 1.5 + lineHeight,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(newData?.content || ""),
                    }}
                  ></div>
                  <div className="text-[16px] mt-2">
                    Tác giả:
                    <span className="font-semibold capitalize">
                      {newData?.author || ""}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex font-bold gap-2 mr-[4px] mt-3">
                      Chia sẻ:
                      {/* <FacebookShareButton
                        url={currentUrl}
                        title={newData?.title}
                        blankTarget={true}
                      >
                        <FaFacebook className="text-[20px] leading-[30px] sm:text-2xl !text-[#3b5998] cursor-pointer" />
                      </FacebookShareButton>
                      <ZaloShareButton />
                      <TwitterShareButton
                        url={currentUrl}
                        title={newData?.title}
                        blankTarget={true}
                      >
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faTwitter}
                            style={{
                              cursor: "pointer",
                              fontSize: "24px",
                              color: "#50abf1",
                            }}
                          />
                        </div>
                      </TwitterShareButton> */}
                    </div>
                  </div>
                </div>
                <div className="sm:w-full lg:w-1/3 colstyle">
                  <div className="mb-3">
                    <MostReadNews
                      heading="Tin mới nhất"
                      url="tin-moi-nhat.rss"
                      view={1}
                    />
                  </div>
                  <div>
                    <MostReadNews
                      url="tin-xem-nhieu.rss"
                      heading="Tin xem nhiều nhất"
                      view={1}
                    />
                  </div>
                  {/* {type === TypePage.EVENT ? (
                    <>
                      <div className="mt-3">
                        <Banner />
                      </div>
                      <div className="mt-3">
                        <BannerDetailNews translation={translation} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>{/* <NotPage dictionaries={translation}>{translation}</NotPage> */}</>
      )}
    </>
  );
}
