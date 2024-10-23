import * as Button from "../buttons";
import SingleTextSection from "./singleTextSection";

const PageTextSection = ({ heading, subtitle, buttonText, buttonLink, textId, showCtaButton }) => {
  const currentPage = window.location.pathname.slice(1);
  const year = new Date();
  const currYear = year.getFullYear();
  const yearText = currYear - 2014;

  return (
    <>
      <div className="band-wrapper flex flex-col justify-center content-center max-w-screenMax ml-auto mr-auto">
        <h2 className="pb-4 mt-4 lg:mt-16 text-3xl pr-4 pl-4 lg:text-5xl font-extrabold leading-none tracking-tight text-black flex justify-center uppercase text-center">
          {heading}
        </h2>
        <h3 className="justify-center flex text-3xl lg:text-4xl pr-4 pl-4 text-center">{subtitle}</h3>
        <SingleTextSection textId={textId} />
        {showCtaButton && (
          <div className="button-container mb-16 flex justify-center">
            <Button.ClickButton
              text={buttonText}
              // link="../applications"
              classNme="flex mt-4 pt-4 pb-4 pl-8 pr-8 uppercase font-semibold rounded"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PageTextSection;
