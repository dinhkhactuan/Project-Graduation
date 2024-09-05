// app/profile/components/UserInfoForm.tsx
import { FC } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title } = Typography;

const UserInfoForm: FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Simulate form submission
    message.success("Thông tin đã được cập nhật thành công!");
    console.log("Received values of form: ", values);
  };

  return (
    <Card>
      <Title level={4}>Thông tin cá nhân</Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1234567890",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", message: "Email không hợp lệ!" }]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserInfoForm;
