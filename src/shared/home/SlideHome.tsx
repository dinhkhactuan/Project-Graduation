"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { advertisementSelectors } from "@/service/store/advertiment/advertiment.reducer";
import { IAdvertisement, Status } from "@/model/advertisement.model";
import { useEffect } from "react";
import {
  getAdvertimentHome,
  getAdvertiments,
} from "@/service/store/advertiment/advertiment.api";
import { RootState } from "@/service/store/reducers";

const SlideHome = () => {
  const dispatch = useDispatch();
  const { advertisementHome } = useSelector(
    (state: RootState) => state.advertiment.initialState
  );

  const bannerApproval = advertisementHome.filter(
    (item: IAdvertisement) => item.advertisementPosition === "center"
  );

  useEffect(() => {
    dispatch(getAdvertimentHome() as any);
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
