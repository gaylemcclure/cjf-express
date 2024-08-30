const BannerHeader = ({ url, filename, headingText }) => {
  return (
    <>
      <div className="banner-heading relative bg-black">
        <img
          src={url}
          alt={filename}
          className="w-screen max-h-[400px] object-cover opacity-30"
        />
        <h2 className="absolute z-10 top-[40%] uppercase w-full flex justify-center text-white text-6xl font-semibold">
          {headingText}
        </h2>
      </div>
    </>
  );
};

export default BannerHeader;
