"use client";

import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import AvatarContainer from "../components/avata/Avata";
import { useSelector } from "react-redux";
import { RootState } from "@/service/store/reducers";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("");

  // Assuming you have a user state in your Redux store
  const { user } = useSelector((state: RootState) => state.user.initialState);

  useEffect(() => {
    // Set the user role when the component mounts or when the user changes
    if (user && user.roleEntity) {
      setUserRole(user.roleEntity.roleCode.toLowerCase());
    }
  }, [user]);

  const menuItems = [
    {
      key: "/cms/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      roles: ["admin"],
    },
    {
      key: "/cms/userManagement",
      icon: <UserOutlined />,
      label: "Users",
      roles: ["admin"],
    },
    {
      key: "/cms/adverManagement",
      icon: <ShoppingCartOutlined />,
      label: "Advertisement",
      roles: ["admin", "user"],
    },
    {
      key: "/cms/role",
      icon: <SafetyCertificateOutlined />,
      label: "Roles",
      roles: ["admin"],
    },
    {
      key: "/cms/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      roles: ["admin"],
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => item.roles.includes(userRole) || userRole === "admin"
  );

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
        items={filteredMenuItems}
        onClick={({ key }) => handleMenuClick(key as string)}
      />
    </Sider>
  );
};

export default Sidebar;
