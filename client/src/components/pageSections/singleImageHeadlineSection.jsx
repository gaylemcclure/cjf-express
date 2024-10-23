import styled from "styled-components";
import * as Button from "../buttons";
import SingleTextSection from "./singleTextSection";
const SingleImageHeadlineSection = ({ url, filename, heading, subtext, textId, buttonText, buttonLink, imageside }) => {
  return (
    <>
      <div className="browser">
        {/* Browser view */}
        {imageside === "Left" && (
          <div className="hidden place-content-center tablet:flex bg-gray">
            <div className="gallery w-[40%]">
              <ImageComponent src={url} alt={filename} />
            </div>
            <div className="band-wrapper flex flex-col justify-center content-center w-[60%] m-4 pl-12">
              <h1 className="text-5xl font-extrabold leading-none tracking-tight text-black flex uppercase">{heading}</h1>
              <p className="pt-4">{subtext}</p>
              <div className="button-container mt-8">
                <Button.LinkButton
                  text={buttonText}
                  link={buttonLink.fields.slug}
                  classNme="std-button justify-center content-center bg-yellowAlt h-[4rem] hover:border-none hover:opacity-70"
                  linkClass="text-black uppercase font-semibold flex hover:opacity-50 hover:text-black "
                />
              </div>
            </div>
          </div>
        )}
        {imageside === "Right" && (
          <div className="hidden place-content-center tablet:flex bg-gray">
            <div className="band-wrapper flex flex-col justify-center content-center w-[60%] m-4 pl-12">
              <h1 className="text-5xl font-extrabold leading-none tracking-tight text-black flex uppercase">{heading}</h1>
              <p className="pt-4">{subtext}</p>
              <div className="button-container mt-8">
                <Button.LinkButton
                  text={buttonText}
                  link={buttonLink.fields.slug}
                  classNme="std-button justify-center content-center bg-yellowAlt h-[4rem] hover:border-none hover:opacity-70"
                  linkClass="text-black uppercase font-semibold flex hover:opacity-50 hover:text-black "
                />
              </div>
            </div>
            <div className="gallery w-[40%]">
              <ImageComponent src={url} alt={filename} />
            </div>
          </div>
        )}
      </div>
      {/* Mobile view */}
      <div className="mobile">
        <div className="place-content-center tablet:flex bg-gray relative">
          <div className="gallery relative">
            <ImageComponent src={url} alt={filename} />
          </div>
          <div className="band-wrapper flex flex-col justify-center content-center m-8 bg-ltGray relative bottom-28 p-8 rounded">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-black flex uppercase ">{heading}</h1>
            <p className="pt-4">{subtext}</p>
            <div className="button-container">
              <Button.LinkButton
                text={buttonText}
                link={buttonLink.fields.slug}
                classNme="std-button justify-center content-center bg-yellowAlt h-[4rem] hover:border-none hover:opacity-70 rounded"
                linkClass="text-black uppercase font-semibold flex hover:opacity-50 hover:text-black justify-center items-center "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ImageComponent = styled.img``;

const ImageWrapper = styled.div``;
export default SingleImageHeadlineSection;
