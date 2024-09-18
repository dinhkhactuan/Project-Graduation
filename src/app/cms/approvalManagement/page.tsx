import dynamic from "next/dynamic";
const ApprovalManagement = dynamic(() => import("./ApprovalManagement"), {
  ssr: false,
});

const Approval = () => {
  return (
    <>
      <ApprovalManagement />
    </>
  );
};

export default Approval;
