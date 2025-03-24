import styled from "styled-components";

const HeroImageSection = ({ url, overlay, overlayText, hasButton, buttonText, buttonLink }) => {
  console.log(url);
  const newUrl = `https:${url}`;
  console.log(newUrl);
  const hasOverlay = () => {
    if (overlay) {
      return (
        <div className="h-screen bg-black">
          <div className="absolute top-[25%] left-[30%] w-[40%] z-10 flex flex-col items-center">
            <h1 className="text-white  text-[80px] text-center mb-8">{overlayText}</h1>
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
