import dynamic from "next/dynamic";

const AdvertisingFieldManagement = dynamic(() => import("./AdvertisingField"), {
  ssr: false,
});
const AdverManagement = () => {
  return (
    <>
      <AdvertisingFieldManagement />
    </>
  );
};

export default AdverManagement;
