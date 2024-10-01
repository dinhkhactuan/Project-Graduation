"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { advertisementSelectors } from "@/service/store/advertiment/advertiment.reducer";
import { IAdvertisement, Status } from "@/model/advertisement.model";
import { useEffect } from "react";
import { getAdvertiments } from "@/service/store/advertiment/advertiment.api";

const SlideHome = () => {
  const dispatch = useDispatch();
  const banners = useSelector(advertisementSelectors.selectAll);
  const bannerApproval = banners.filter(
    (item: IAdvertisement) =>
      item.status === Status.APPROVED && item.advertisementPosition === "center"
  );

  useEffect(() => {
    dispatch(getAdvertiments() as any);
  }, []);

  if (bannerApproval.length === 0) {
    return null;
  }

  const bannerSrc = bannerApproval[0]?.advertisementLink || "";

  return (
    <div className="w-full h-[300px] relative">
      {bannerSrc && (
        <Image
          src={bannerSrc}
          alt="Advertisement Banner"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default SlideHome;
