"use client";
import { useEffect, useState } from "react";
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
  Tooltip,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CreditCardOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdvertiments,
  createAdvertiment,
  updateAdvertiment,
  deleteAdvertiment,
  getAdvertimentByUser,
  revenueAdvertiment,
  requestApprovalAdvertiment,
} from "@/service/store/advertiment/advertiment.api";
import {
  advertisementSelectors,
  resetEntity,
} from "@/service/store/advertiment/advertiment.reducer";
import { IAdvertisement, Status } from "@/model/advertisement.model";
import dayjs from "dayjs";
import { RootState } from "@/service/store/reducers";
import { createPayment } from "@/service/store/vnpay/vnpay.api";
import { toast } from "react-toastify";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AdManagement = () => {
  const ads = useSelector(advertisementSelectors.selectAll);
  const { updateStatusUser, deleteStatusUser, isRequestApproval } = useSelector(
    (state: RootState) => state.advertiment.initialState
  );
  const { user } = useSelector((state: RootState) => state.user.initialState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingAdId, setEditingAdId] = useState<number | null>(null);
  const [requestAdver, setRequestAdver] = useState<number | null>(null);
  const [urlPayment, setUrlPayment] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (urlPayment) {
      const a = document.createElement("a");
      a.setAttribute("href", urlPayment), a.setAttribute("target", "_blank");
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, [urlPayment]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.roleEntity?.roleCode === "admin") {
        await dispatch(getAdvertiments() as any);
      } else {
        await dispatch(getAdvertimentByUser(Number(user?.userId)) as any);
      }
    };
    fetchData();
  }, [user?.userId]);

  useEffect(() => {
    if (updateStatusUser) {
      toast.success(
        `${editingAdId ? "Chỉnh sửa" : "Tạo mới"} quảng cáo thành công`
      );
      dispatch(resetEntity());
      setIsModalVisible(false);
      (async () => {
        if (user?.roleEntity?.roleCode === "admin")
          return await dispatch(getAdvertiments() as any);
        await dispatch(getAdvertimentByUser(Number(user?.userId)) as any);
      })();
    }
  }, [updateStatusUser]);

  useEffect(() => {
    if (deleteStatusUser) {
      toast.success(`Xóa quảng cáo thành công`);
      dispatch(resetEntity());
      setIsModalVisible(false);
      (async () => {
        if (user?.roleEntity?.roleCode === "admin")
          return await dispatch(getAdvertiments() as any);
        await dispatch(getAdvertimentByUser(Number(user?.userId)) as any);
      })();
    }
  }, [deleteStatusUser]);

  useEffect(() => {
    if (isRequestApproval) {
      toast.success(`Gửi phê duyệt quảng cáo thành công`);
      dispatch(resetEntity());
      setIsModalVisible(false);
      (async () => {
        if (user?.roleEntity?.roleCode === "admin")
          return await dispatch(getAdvertiments() as any);
        await dispatch(getAdvertimentByUser(Number(user?.userId)) as any);
      })();
    }
  }, [isRequestApproval]);

  const columns = [
    { title: "Name", dataIndex: "advertisementName", key: "advertisementName" },
    {
      title: "Link",
      dataIndex: "advertisementLink",
      key: "advertisementLink",
      render: (_: any, record: IAdvertisement) => {
        return (
          <a href={record?.advertisementLink ?? ""} target="_blank">
            {record.advertisementLink}
          </a>
        );
      },
      width: 100,
      ellipsis: true,
    },
    {
      title: "Position",
      dataIndex: "advertisementPosition",
      key: "advertisementPosition",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      ellipsis: true,
    },
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
      ) => fields.map((field) => field?.advertisingFieldName).join(", "),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IAdvertisement) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            ></Button>
          </Tooltip>
          {user?.roleEntity?.roleCode === "user" &&
            record.status !== Status.APPROVED && (
              <Popconfirm
                title="Bạn có chắc chắn muốn gửi phê duyệt quảng cáo này?"
                onConfirm={() => {
                  handleSendApproval(record);
                }}
                okText="Có"
                cancelText="Không"
              >
                <Tooltip title="Gửi phê duyệt">
                  <Button icon={<FormOutlined />}></Button>
                </Tooltip>
              </Popconfirm>
            )}
          {user?.roleEntity?.roleCode === "user" &&
            record.status === Status.APPROVED && (
              <Tooltip title="Thanh toán">
                <Button
                  icon={<CreditCardOutlined />}
                  onClick={() => handlePayment(record)}
                ></Button>
              </Tooltip>
            )}
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa quảng cáo này?"
            onConfirm={() => handleDelete(record.advertisementId)}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Xóa">
              <Button icon={<DeleteOutlined />} danger></Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingAdId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handlePayment = (record: IAdvertisement) => {
    dispatch(revenueAdvertiment(record.advertisementId) as any).then(
      (data: any) => {
        const revenue = data.payload?.data;
        const amount = Number(revenue.amount.toString().replace(/[,.]/g, ""));
        dispatch(
          createPayment({
            amount: amount,
            orderInfo: `Thanh toán ${record.advertisementName}`,
          }) as any
        ).then((data: any) => {
          setUrlPayment(data.payload);
        });
      }
    );
  };

  const handleEdit = (record: IAdvertisement) => {
    setEditingAdId(record.advertisementId);
    form.setFieldsValue({
      ...record,
      timeRange: [dayjs(record.startDate), dayjs(record.endDate)],
      advertisingFields: record.advertisingFields.map(
        (field) => field?.advertisingFieldId
      ),
    });
    setIsModalVisible(true);
  };

  const handleSendApproval = (record: IAdvertisement) => {
    setRequestAdver(record.advertisementId);
    form.setFieldsValue({
      ...record,
      timeRange: [dayjs(record.startDate), dayjs(record.endDate)],
      advertisingFields: record?.advertisingFields?.map(
        (field) => field?.advertisingFieldId
      ),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteAdvertiment(id) as any);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const [startTime, endTime] = values?.timeRange;
      if (editingAdId === null && requestAdver === null) {
        const newAd: any = {
          advertisementName: values.advertisementName,
          advertisementLink: values.advertisementLink,
          advertisementPosition: values.advertisementPosition,
          startDate: startTime.format("YYYY-MM-DD"),
          endDate: endTime.format("YYYY-MM-DD"),
          advertisingFieldIds: values?.advertisingFields?.map(
            (id: number) => id
          ),
          price: String(values.price),
          userId: user?.userId,
        };
        dispatch(createAdvertiment(newAd) as any);
      } else if (requestAdver && editingAdId === null) {
        dispatch(requestApprovalAdvertiment(requestAdver) as any);
      } else {
        const Ad: any = {
          advertisementName: values.advertisementName,
          advertisementLink: values.advertisementLink,
          advertisementPosition: values.advertisementPosition,
          startDate: startTime.format("YYYY-MM-DD"),
          endDate: endTime.format("YYYY-MM-DD"),
          price: String(values.price),
          advertisementId:
            editingAdId ||
            Math.max(...ads.map((ad) => ad.advertisementId), 0) + 1,
          advertisingFieldIds: values.advertisingFields.map((id: number) => id),
        };
        dispatch(updateAdvertiment(Ad) as any);
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng số quảng cáo" value={ads.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Trạng thái quảng cáo"
              value={ads.filter((ad) => ad.status === Status.PENDING).length}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng giá quảng cáo"
              value={ads.reduce((sum, ad) => sum + ad.price, 0) + " VNĐ"}
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
        Thêm mới quảng cáo
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
            <InputNumber min={0} prefix="vnđ" />
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
