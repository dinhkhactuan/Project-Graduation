"use client";

import React, { useEffect } from "react";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { advertisementSelectors } from "@/service/store/advertiment/advertiment.reducer";
import { IAdvertisement, Status } from "@/model/advertisement.model";
import {
  getAdvertimentHome,
  getAdvertiments,
} from "@/service/store/advertiment/advertiment.api";
import Image from "next/image";
import { RootState } from "@/service/store/reducers";

const { Footer } = Layout;

const FooterHome = () => {
  const dispatch = useDispatch();
  const { advertisementHome } = useSelector(
    (state: RootState) => state.advertiment.initialState
  );
  const bannerApproval = advertisementHome.filter(
    (item: IAdvertisement) =>
      item.status === Status.APPROVED && item.advertisementPosition === "footer"
  );
  const bannerSrc = bannerApproval[0]?.advertisementLink || "";

  useEffect(() => {
    dispatch(getAdvertimentHome() as any);
  }, [dispatch]);
  return (
    <Layout>
      {bannerApproval.length > 0 && (
        <div className="w-full h-[250px] relative">
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
      )}
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant DinhTuan
      </Footer>
    </Layout>
  );
};

export default FooterHome;
