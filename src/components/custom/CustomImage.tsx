import { useEffect, useState } from "react";
import emptyImg from "../../assets/img/image-error.png";
import Image from "next/image";

interface ICustomImageProps {
  src: string;
  rate?: "1:1" | "16:9" | "4:3";
  object?: "contain" | "cover";
  scaleWhenHover?: boolean;
  onClick?: Function;
}

const CustomImage = ({
  src,
  rate = "4:3",
  object = "cover",
  scaleWhenHover = true,
  onClick,
}: ICustomImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [emptyImage, setEmptyImage] = useState(false);

  const [horizontal, vertical] = rate.split(":");
  const paddingTop = (+vertical / +horizontal) * 100;

  const urlPattern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

  useEffect(() => {
    if (!src) {
      setEmptyImage(true);
    } else if (!urlPattern.test(src)) {
      setImageError(true);
    }
  }, [src]);

  return (
    <>
      {!imageError ? (
        emptyImage ? (
          <div
            style={{ width: "100%", paddingTop: `${paddingTop}%` }}
            className="relative overflow-hidden"
          >
            <Image
              src={emptyImg}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                inset: 0,
                objectFit: "contain",
                opacity: 1,
              }}
            />
          </div>
        ) : (
          <div
            style={{ width: "100%", paddingTop: `${paddingTop}%` }}
            className="relative overflow-hidden"
          >
            <Image
              src={src}
              alt=""
              onClick={(e) => {
                onClick && onClick(e);
              }}
              width={0}
              height={0}
              sizes="100vw"
              className={`absolute w-full h-full inset-0 ${
                scaleWhenHover ? "hover:scale-110 duration-500" : ""
              }`}
              style={{ objectFit: object }}
              onError={() => {
                setImageError(true);
              }}
            />
          </div>
        )
      ) : (
        <div
          style={{ width: "100%", paddingTop: `${paddingTop}%` }}
          className="relative overflow-hidden"
        >
          <Image
            src={emptyImg}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              inset: 0,
              objectFit: "contain",
              opacity: 1,
            }}
          />
        </div>
      )}
    </>
  );
};

export default CustomImage;
