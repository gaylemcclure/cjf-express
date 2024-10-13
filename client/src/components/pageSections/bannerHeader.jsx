const BannerHeader = ({ url, filename, headingText }) => {
  const currentPage = window.location.pathname.slice(1);
  const year = new Date();
  const currYear = year.getFullYear();
  const yearText = currYear - 2014;

  return (
    <>
      <div className="banner-heading relative bg-black">
        <img src={url} alt={filename} className="w-screen max-h-[400px] object-cover opacity-30" />
        {currentPage === "history" ? (
          <h2 className="absolute z-10 top-[40%] uppercase w-full flex justify-center text-white text-6xl font-semibold">
            {yearText} {headingText}
          </h2>
        ) : (
          <h2 className="absolute z-10 top-[40%] uppercase w-full flex justify-center text-white text-6xl font-semibold">{headingText}</h2>
        )}
      </div>
    </>
  );
};

export default BannerHeader;
