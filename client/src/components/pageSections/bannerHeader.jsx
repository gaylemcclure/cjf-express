const BannerHeader = ({ url, filename, headingText }) => {
  const currentPage = window.location.pathname.slice(1);
  const year = new Date();
  const currYear = year.getFullYear();
  const yearText = currYear - 2014;

  return (
    <>
      <div className="banner-heading relative bg-black">
        <img src={url} alt={filename} className="w-screen max-h-[250px] lg:max-h-[400px] object-cover opacity-30" />
        {currentPage === "history" ? (
          <h2 className="absolute z-10 top-[10%] lg:top-[40%] uppercase w-full flex justify-center text-white text-6xl font-semibold pl-4 pr-4 text-center">
            {yearText} {headingText}
          </h2>
        ) : (
          <h2 className="absolute z-10 top-[10%] lg:top-[40%] uppercase w-full flex justify-center text-white text-5xl lg:text-6xl font-semibold pl-4 pr-4 text-center">
            {headingText}
          </h2>
        )}
      </div>
    </>
  );
};

export default BannerHeader;
