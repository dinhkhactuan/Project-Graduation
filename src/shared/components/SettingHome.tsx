import { Modal, Tabs } from "antd";

interface ISettingHome {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
const SettingHome = (prop: ISettingHome) => {
  const { handleCancel, handleOk, isModalOpen } = prop;
  const items = [
    {
      label: `Tùy chọn theme`,
      key: 1,
      children: "1",
    },
    {
      label: `Preview trang chủ`,
      key: 2,
      children: "2",
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <>
      <Modal
        width={800}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tabs onChange={onChange} type="line" items={items as any} />
      </Modal>
    </>
  );
};
export default SettingHome;
