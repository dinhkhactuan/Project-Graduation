"use client";

import React from "react";
import { Row, Col, Card, Statistic, Table, Typography, Progress } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  FileOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Title } = Typography;

// Dữ liệu mẫu cho biểu đồ
const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 550 },
  { name: "Apr", value: 450 },
  { name: "May", value: 650 },
  { name: "Jun", value: 700 },
];

// Dữ liệu mẫu cho bảng
const tableData = [
  { key: 1, product: "Sản phẩm A", sales: 32, revenue: 3200 },
  { key: 2, product: "Sản phẩm B", sales: 28, revenue: 4200 },
  { key: 3, product: "Sản phẩm C", sales: 45, revenue: 5600 },
  { key: 4, product: "Sản phẩm D", sales: 20, revenue: 2800 },
];

const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Số lượng bán",
    dataIndex: "sales",
    key: "sales",
  },
  {
    title: "Doanh thu",
    dataIndex: "revenue",
    key: "revenue",
    render: (text: number) => `$${text}`,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Tổng quan</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Người dùng mới"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn hàng"
              value={593}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Doanh thu"
              value={15800}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Báo cáo" value={24} prefix={<FileOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card title="Doanh thu theo tháng">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top sản phẩm bán chạy">
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={8}>
          <Card title="Mục tiêu doanh thu">
            <Progress
              type="circle"
              percent={75}
              format={(percent) => `${percent}%`}
            />
            <p style={{ marginTop: "16px" }}>
              Đã đạt 75% mục tiêu doanh thu quý này
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="So sánh với tháng trước">
            <Statistic
              title="Tăng trưởng"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tỷ lệ hủy đơn hàng">
            <Statistic
              title="Giảm"
              value={3.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
