"use client";
import React from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const UserManagement: React.FC = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<any>(null);
  const [form] = Form.useForm();

  const showModal = (user: any = null) => {
    setEditingUser(user);
    form.setFieldsValue(user || { name: "", email: "", role: "" });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: "16px" }}
      >
        Add User
      </Button>
      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="user_form">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please input the role!" }]}
          >
            <Input prefix={<SafetyCertificateOutlined />} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
