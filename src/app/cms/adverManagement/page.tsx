import dynamic from "next/dynamic";
const AdManagement = dynamic(() => import("./adverManagement"), {
  ssr: false,
});
const AdverManagement = () => {
  return (
    <>
      <AdManagement />
    </>
  );
};

export default AdverManagement;
