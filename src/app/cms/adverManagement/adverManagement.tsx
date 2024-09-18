"use client";
import React, { useEffect } from "react";
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
  InputNumber,
  DatePicker,
  Tag,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdvertiments,
  createAdvertiment,
  updateAdvertiment,
  deleteAdvertiment,
  getAdvertimentByUser,
} from "@/service/store/advertiment/advertiment.api";
import { advertisementSelectors } from "@/service/store/advertiment/advertiment.reducer";
import { IAdvertisement, Status } from "@/model/advertisement.model";
import dayjs from "dayjs";
import { RootState } from "@/service/store/reducers";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AdManagement = () => {
  const ads = useSelector(advertisementSelectors.selectAll);
  const { user } = useSelector((state: RootState) => state.user.initialState);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [editingAdId, setEditingAdId] = React.useState<number | null>(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.roleEntity?.roleCode === "admin")
      return dispatch(getAdvertiments() as any);
    dispatch(getAdvertimentByUser(Number(user?.userId)) as any);
  }, [dispatch]);

  const columns = [
    { title: "Name", dataIndex: "advertisementName", key: "advertisementName" },
    { title: "Link", dataIndex: "advertisementLink", key: "advertisementLink" },
    {
      title: "Position",
      dataIndex: "advertisementPosition",
      key: "advertisementPosition",
    },
    {
      title: "Start Date",
      dataIndex: "startTime",
      key: "startTime",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "endTime",
      key: "endTime",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Status) => (
        <Tag color={status === Status.APPROVED ? "green" : "gold"}>
          {status === "APPROVED" ? "Đã phê duyệt" : "Chờ phê duyệt"}
        </Tag>
      ),
    },
    {
      title: "Fields",
      dataIndex: "advertisingFields",
      key: "advertisingFields",
      render: (
        fields: { advertisingFieldId: number; advertisingFieldName: string }[]
      ) => fields.map((field) => field.advertisingFieldName).join(", "),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IAdvertisement) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {user?.roleEntity?.roleCode === "user" && (
            <Button
              icon={<EditOutlined />}
              onClick={() => handleSendApproval(record)}
            >
              Submit approval
            </Button>
          )}
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.advertisementId)}
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

  const handleEdit = (record: IAdvertisement) => {
    setEditingAdId(record.advertisementId);
    form.setFieldsValue({
      ...record,
      timeRange: [dayjs(record.startTime), dayjs(record.endTime)],
      advertisingFields: record.advertisingFields.map(
        (field) => field.advertisingFieldId
      ),
    });
    setIsModalVisible(true);
  };

  const handleSendApproval = (record: IAdvertisement) => {
    setEditingAdId(record.advertisementId);
    form.setFieldsValue({
      ...record,
      timeRange: [dayjs(record.startTime), dayjs(record.endTime)],
      advertisingFields: record.advertisingFields.map(
        (field) => field.advertisingFieldId
      ),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteAdvertiment(id) as any);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const [startTime, endTime] = values.timeRange;
      const newAd: IAdvertisement = {
        ...values,
        startTime: startTime.format("YYYY-MM-DD"),
        endTime: endTime.format("YYYY-MM-DD"),
        status: Status.PENDING,
        advertisementId:
          editingAdId ||
          Math.max(...ads.map((ad) => ad.advertisementId), 0) + 1,
        advertisingFields: values.advertisingFields.map((id: number) => {
          return {
            advertisingFieldId: id,
            advertisingFieldName: id === 1 ? "Dien tu" : "Co khi",
          };
        }),
      };

      if (editingAdId === null) {
        dispatch(createAdvertiment(newAd) as any);
      } else {
        dispatch(updateAdvertiment(newAd) as any);
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Ads" value={ads.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Pending Ads"
              value={ads.filter((ad) => ad.status === Status.PENDING).length}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={ads.reduce((sum, ad) => sum + ad.price, 0)}
              prefix="$"
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

      <Table columns={columns} dataSource={ads} rowKey="advertisementId" />

      <Modal
        title={editingAdId === null ? "Add New Ad" : "Edit Ad"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="advertisementName"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="advertisementLink"
            label="Link"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="advertisementPosition"
            label="Position"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="center">Center</Option>
              <Option value="sidebar">Sidebar</Option>
              <Option value="footer">Footer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="timeRange"
            label="Time Range"
            rules={[{ required: true }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} prefix="$" />
          </Form.Item>
          <Form.Item
            name="advertisingFields"
            label="Advertising Fields"
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              <Option value={1}>Dien tu</Option>
              <Option value={3}>Co khi</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdManagement;
