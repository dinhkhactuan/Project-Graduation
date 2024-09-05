"use client";
import React, { useState } from "react";
import { Layout, Button, Avatar } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "../../shared/home/Sidebar";
import AuthProtected from "../(provider)/AuthProtected";
import AvatarContainer from "@/shared/components/avata/Avata";

const { Header, Content } = Layout;

interface LayoutCmsProps {
  children: React.ReactNode;
}

const LayoutCms: React.FC<LayoutCmsProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <AuthProtected>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <Header style={{ padding: 0, background: "#fff" }}>
            <div
              className="flex item-center"
              style={{ justifyContent: "space-between" }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: "16px", width: 64, height: 64 }}
              />
              <AvatarContainer />
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#fff",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AuthProtected>
  );
};

export default LayoutCms;
