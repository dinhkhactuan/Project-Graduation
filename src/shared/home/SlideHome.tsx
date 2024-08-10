import Image from "next/image";
import slide1 from "../../assets/img/slide1.jpg";

const SlideHome = () => {
  return (
    <div className="w-full h-[250px]">
      <Image
        style={{
          width: "100%",
        }}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full"
        src={slide1}
        alt=""
      />
    </div>
  );
};

export default SlideHome;
