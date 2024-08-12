import { Modal, Tabs } from "antd";
import { Preview } from "./Preview";
import { Tab } from "./tab";

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
      children: <Preview tab={Tab.THEME} />,
    },
    {
      label: `Preview trang chủ`,
      key: 2,
      children: <Preview tab={Tab.PREVIEW_HOME} />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <>
      <Modal
        width={"100%"}
        height={"100%"}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 0, paddingBottom: 0 }}
        bodyStyle={{ height: "calc(100vh - 120px)", overflowY: "hidden" }}
      >
        <Tabs
          style={{ height: "100%" }}
          onChange={onChange}
          type="line"
          items={items as any}
        />
      </Modal>
    </>
  );
};
export default SettingHome;
