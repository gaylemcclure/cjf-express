import styled from "styled-components";
import * as Button from '../buttons';

const SingleImageTextSection = ({ data }) => {

  console.log(data)
  return (
  <ImageWrapper>
    {/* Browser view */}
    <div className="hidden place-content-center tablet:flex bg-white">
      <div className="gallery w-[40%]">
      <ImageComponent src={data.image.fields.file.url} alt={data.image.fields.file.filename} />
      </div>
      <div className="band-wrapper flex flex-col justify-center content-center w-[60%] m-4 ml-12">
        <h1 className="text-6xl font-extrabold leading-none tracking-tight text-black flex uppercase">{data.headingText}</h1>
        <h3 className="mt-4 text-black text-4xl">{data.subText}</h3>
        <div className="button-container mt-8">
          <Button.LinkButton
            text={data.buttonText}
            link="../support/volunteer"
            classNme="std-button justify-center content-center bg-yellowAlt h-[4rem] hover:border-none hover:opacity-70"
            linkClass="text-black uppercase font-semibold flex hover:opacity-50 hover:text-black "
          />
        </div>
      </div> 
</div>

  </ImageWrapper>
  )
}

const ImageComponent = styled.img`

`

const ImageWrapper = styled.div`


`
export default SingleImageTextSection;