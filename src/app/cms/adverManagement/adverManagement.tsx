"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Card,
  Statistic,
  Row,
  Col,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Ad {
  id: number;
  name: string;
  type: string;
  placement: string;
  startDate: string;
  endDate: string;
  status: string;
}

const initialAds: Ad[] = [
  {
    id: 1,
    name: "Summer Sale Banner",
    type: "Banner",
    placement: "Homepage",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "Active",
  },
  {
    id: 2,
    name: "New Product Pop-up",
    type: "Pop-up",
    placement: "Product Page",
    startDate: "2023-07-15",
    endDate: "2023-09-15",
    status: "Scheduled",
  },
  {
    id: 3,
    name: "Holiday Discount",
    type: "Sidebar",
    placement: "All Pages",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    status: "Draft",
  },
];

const AdManagement: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>(initialAds);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingAdId, setEditingAdId] = useState<number | null>(null);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Placement", dataIndex: "placement", key: "placement" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Ad) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingAdId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Ad) => {
    setEditingAdId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setAds(ads.filter((ad) => ad.id !== id));
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingAdId === null) {
        // Add new ad
        const newAd = {
          ...values,
          id: Math.max(...ads.map((ad) => ad.id)) + 1,
        };
        setAds([...ads, newAd]);
      } else {
        // Update existing ad
        setAds(
          ads.map((ad) => (ad.id === editingAdId ? { ...ad, ...values } : ad))
        );
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Ad Management</h1>

      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Ads" value={ads.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Ads"
              value={ads.filter((ad) => ad.status === "Active").length}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Scheduled Ads"
              value={ads.filter((ad) => ad.status === "Scheduled").length}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Draft Ads"
              value={ads.filter((ad) => ad.status === "Draft").length}
            />
          </Card>
        </Col>
      </Row>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: "16px" }}
      >
        Add New Ad
      </Button>

      <Table columns={columns} dataSource={ads} />

      <Modal
        title={editingAdId === null ? "Add New Ad" : "Edit Ad"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Option value="Banner">Banner</Option>
              <Option value="Pop-up">Pop-up</Option>
              <Option value="Sidebar">Sidebar</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="placement"
            label="Placement"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Scheduled">Scheduled</Option>
              <Option value="Draft">Draft</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdManagement;
