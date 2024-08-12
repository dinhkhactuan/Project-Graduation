import React, { useState } from "react";
import { Form, Input, Select, Radio, Space, RadioChangeEvent } from "antd";

const { Option } = Select;

const Panel1FormTheme = () => {
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
      <Form.Item label="Danh sách chủ đề">
        <Radio.Group
          style={{ display: "flex", flexDirection: "column" }}
          value={selectedLayout}
          onChange={handleLayoutChange}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {["Chủ đề 1", "Chủ đề 2", "Chủ đề 3", "Chủ đề 4"].map((layout) => (
              <Radio key={layout} value={layout} style={getRadioStyle(layout)}>
                {`Chủ đề ${layout.slice(-1)}`}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default Panel1FormTheme;
