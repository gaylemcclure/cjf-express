import styled from "styled-components";

const HeroImageSection = ({ url, overlay, overlayText, hasButton, buttonText, buttonLink }) => {
  console.log(url);
  const newUrl = `https:${url}`;
  console.log(newUrl);
  const hasOverlay = () => {
    if (overlay) {
      return (
        <div className="h-screen bg-black">
          <div className="absolute z-10 flex flex-col items-center top-[23%] w-[90%] left-[5%] md:left-[10%] md:w-[80%] lg:w-[60%] lg:left-[20%] xl:w-[40%] xl:left-[30%]">
            <h1 className="text-white  text-[3.25rem] text-center mb-8 sm:text-lg md:text-[5rem]">{overlayText}</h1>
            <a href={buttonLink} target="_blank" className="text-white">
              <button className="bg-yellowAlt rounded text-2xl uppercase border-none hover:bg-[#625f5f] hover:text-yellowAlt">{buttonText}</button>
            </a>
          </div>
          <div className="hero-image h-screen bg-no-repeat bg-cover opacity-25" style={{ backgroundImage: `url(${newUrl})` }}></div>
        </div>
      );
    } else {
      return <ImageSection src={url} alt="hero image" />;
    }
  };

  return <>{hasOverlay()}</>;
};

const ImageSection = styled.img`
  width: 100vw;
  height: 100vh;
`;

export default HeroImageSection;
