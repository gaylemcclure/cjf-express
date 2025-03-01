import styled from "styled-components";

const HeroImageSection = ({ url }) => {
  console.log(url);
  return (
    <>
      <ImageSection src={url} alt="hero image" />
    </>
  );
};

const ImageSection = styled.img`
  width: 100vw;
  height: 100vh;
`;

export default HeroImageSection;
