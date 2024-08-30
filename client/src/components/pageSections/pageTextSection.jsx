import * as Button from "../buttons";
import SingleTextSection from "./singleTextSection";

const PageTextSection = ({
  heading,
  subtitle,
  buttonText,
  buttonLink,
  textId,
}) => {
  return (
    <>
      <div className="band-wrapper flex flex-col justify-center content-center max-w-screenMax ml-auto mr-auto">
        <h2 className="mt-16 text-5xl font-extrabold leading-none tracking-tight text-black flex justify-center uppercase text-center">
          {heading}
        </h2>
        <h3 className={` justify-center flex text-4xl`}>{subtitle}</h3>
        <SingleTextSection textId={textId} />
        <div className="button-container mb-16 flex justify-center">
          <Button.ClickButton
            text={buttonText}
            // link="../applications"
            classNme="flex mt-4 pt-4 pb-4 pl-8 pr-8 uppercase font-semibold"
          />
        </div>
      </div>
    </>
  );
};

export default PageTextSection;
