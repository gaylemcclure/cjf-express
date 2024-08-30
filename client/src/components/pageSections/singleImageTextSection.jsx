import styled from "styled-components";
import * as Button from "../buttons";
import SingleTextSection from "./singleTextSection";
const SingleImageTextSection = ({
  url,
  filename,
  heading,
  subtext,
  textId,
  buttonText,
  buttonLink,
}) => {
  return (
    <>
      {/* Browser view */}
      {/* <div className="hidden place-content-center tablet:flex bg-gray mt-8 pb-8">
        <div className="band-wrapper flex flex-col justify-center content-center w-[60%] m-4 ml-12">
          <h1 className="text-6xl font-extrabold leading-none tracking-tight text-black flex uppercase">
            {heading}
          </h1>
          <SingleTextSection textId={textId} />
          <div className="button-container mt-8">
            <Button.LinkButton
              text={buttonText}
              link={buttonLink}
              classNme="std-button justify-center content-center bg-yellowAlt h-[4rem] hover:border-none hover:opacity-70"
              linkClass="text-black uppercase font-semibold flex hover:opacity-50 hover:text-black "
            />
          </div>
        </div>
        <div className="gallery w-[40%]">
          <ImageComponent src={url} alt={filename} />
        </div>
      </div> */}
    </>
  );
};

const ImageComponent = styled.img``;

const ImageWrapper = styled.div``;
export default SingleImageTextSection;
