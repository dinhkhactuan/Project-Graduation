"use client";

import React, { useState } from "react";
import { Layout, Menu, MenuProps, Modal, theme } from "antd";
import Image from "next/image";
import Search, { SearchProps } from "antd/es/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import SettingHome from "../components/SettingHome";
import { itemsmenu } from "./itemsMenu.model";

const { Header } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const HeaderHome = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Header
        style={{
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="flex items-center justify-between h-full px-[10px]">
          <div>
            <Image
              width={150}
              height={150}
              src="https://cdnweb.dantri.com.vn/dist/static-logo.1-0-1.742f36bc45f3443d0e59.svg"
              alt=""
            />
          </div>
          <Search
            className="!w-2/5"
            placeholder="input search text"
            onSearch={onSearch}
            size="large"
            enterButton
          />
          <div>
            <FontAwesomeIcon icon={faGear} size="xl" onClick={showModal} />
            <SettingHome
              handleCancel={handleCancel}
              handleOk={handleOk}
              isModalOpen={isModalOpen}
            />
          </div>
        </div>
        <Menu
          className="flex item-center w-full justify-between px-0"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={itemsmenu}
        />
      </Header>
    </Layout>
  );
};

export default HeaderHome;
