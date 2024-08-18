import React, { useState } from "react";
import { Form, Input, Select, Radio, Space, RadioChangeEvent } from "antd";

const { Option } = Select;

const Panel1Form = () => {
  const [selectedLayout, setSelectedLayout] = useState("layout1");

  const handleLayoutChange = (e: RadioChangeEvent) => {
    setSelectedLayout(e.target.value);
  };

  const getRadioStyle = (value: string) => {
    const baseStyle = {
      borderRadius: "8px",
      padding: "10px",
      width: "100%",
      marginBottom: "6px",
    };

    if (value === selectedLayout) {
      return {
        ...baseStyle,
        backgroundColor: "#6c757d",
        color: "#fff",
      };
    }

    return {
      ...baseStyle,
      backgroundColor: "#f0f0f0",
      color: "rgba(0, 0, 0, 0.88)", // Default text color in Ant Design
    };
  };
  return (
    <Form layout="vertical">
      <Form.Item
        className="!mb-[8px]"
        name="name"
        label={<span>Tên giao diện</span>}
        rules={[{ required: true, message: "Vui lòng nhập tên giao diện" }]}
      >
        <Input placeholder="Nhập tên giao diện..." />
      </Form.Item>

      <Form.Item
        className="!mb-[8px]"
        name="description"
        label={<span>Mô tả</span>}
        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
      >
        <Input placeholder="Nhập mô tả..." />
      </Form.Item>

      <Form.Item
        className="!mb-[8px]"
        name="page"
        label={<span>Chủ đề</span>}
        rules={[{ required: true, message: "Vui lòng chọn trang" }]}
      >
        <Select placeholder="Chọn chủ đề...">
          <Option value="page1">Chủ đề 1</Option>
          <Option value="page2">Chủ đề 2</Option>
          <Option value="page3">Chủ đề 3</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Danh sách khung layout">
        <Radio.Group
          style={{ display: "flex", flexDirection: "column" }}
          value={selectedLayout}
          onChange={handleLayoutChange}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {["layout1", "layout2", "layout3", "layout4"].map((layout) => (
              <Radio key={layout} value={layout} style={getRadioStyle(layout)}>
                {`Layout ${layout.slice(-1)}`}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default Panel1Form;
