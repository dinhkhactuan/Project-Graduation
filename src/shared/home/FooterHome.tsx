"use client";

import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterHome = () => {
  return (
    <Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant DinhTuan
      </Footer>
    </Layout>
  );
};

export default FooterHome;
