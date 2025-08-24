import styled from "styled-components";
import * as Button from "../buttons";
import SingleTextSection from "./singleTextSection";

const SingleImageTextSection = ({ url, filename, heading, text, textId }) => {
  return (
    <>
      <div className="browser">
        {/* Browser view */}

        <div className="hidden place-content-center tablet:flex bg-gray">
          <div className="band-wrapper flex flex-col justify-center content-center w-[80%] m-4 pl-12 pr-12">
            <h1 className="text-5xl font-extrabold leading-none tracking-tight text-black flex uppercase justify-center">{heading}</h1>
            <div className="ml-auto mr-auto">
              <SingleTextSection textId={textId} />
            </div>
          </div>
          {/* <div className="gallery w-[40%]">
            <ImageComponent src={url} alt={filename} />
          </div> */}
        </div>
      </div>
      {/* Mobile view */}
      <div className="mobile">
        <div className="place-content-center tablet:flex bg-gray relative">
          <div className="band-wrapper flex flex-col justify-center content-center m-8 bg-ltGray relative bottom-28 p-8 rounded">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-black flex uppercase">{heading}</h1>
            <div className="ml-auto mr-auto">
              <SingleTextSection textId={textId} />
            </div>
          </div>
          {/* <div className="gallery w-[40%]">
            <ImageComponent src={url} alt={filename} />
          </div> */}
        </div>
      </div>
    </>
  );
};

const ImageComponent = styled.img``;

const ImageWrapper = styled.div``;
export default SingleImageTextSection;
