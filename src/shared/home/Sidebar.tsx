"use client";

import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import AvatarContainer from "../components/avata/Avata";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { key: "/cms/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/cms/userManagement", icon: <UserOutlined />, label: "Users" },
    {
      key: "/cms/adverManagement",
      icon: <ShoppingCartOutlined />,
      label: "Advertisement",
    },
    { key: "/reports", icon: <FileOutlined />, label: "Reports" },
    { key: "/cms/settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  const handleMenuClick = (key: string) => {
    router.push(key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <AvatarContainer collapsed={collapsed} textColor="#fff" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key as string)}
      />
    </Sider>
  );
};

export default Sidebar;
