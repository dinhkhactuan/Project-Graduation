"use client";
import React, { useState } from "react";
import { Layout, Menu, theme, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Dashboard from "./Home";

const { Header, Sider, Content } = Layout;

const nav = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "DashBoard",
    page: <Dashboard />,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: "Quản lý người dùng",
    page: <div>Quản lý người dùng</div>, // Nội dung ví dụ
  },
  {
    key: "3",
    icon: <VideoCameraOutlined />,
    label: "Quản lý quảng cáo",
    page: <div>Quản lý quảng cáo</div>, // Nội dung ví dụ
  },
  {
    key: "4",
    icon: <UploadOutlined />,
    label: "Quản lý tệp tin",
    page: <div>Quản lý tệp tin</div>, // Nội dung ví dụ
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
  };

  const getContent = () => {
    const currentNav = nav.find((item) => item.key === selectedKey);
    return currentNav ? currentNav.page : null;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={nav}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {getContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
