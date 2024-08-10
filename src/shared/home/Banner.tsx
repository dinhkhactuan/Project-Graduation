const Banner = ({ src, height }: { src: string; height: number }) => {
  return (
    <>
      <iframe width={300} height={height} src={src}></iframe>
    </>
  );
};
export default Banner;
