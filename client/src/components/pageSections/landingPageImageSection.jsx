import styled from "styled-components";
import * as Button from '../buttons';
import { useState, useEffect } from 'react';

const LandingPageImageSection = ({ data }) => {
  const [imageArr, setImageArr] = useState([]);

  useEffect(() => {
    if (data) {
      const arr = [data.image1, data.image2, data.image3, data.image4, data.image5, data.image6, data.image7];
      setImageArr(arr);
    }

  }, [data])

  const ImageComponent = ({ source, alt, width, height, cName }) => {
    return <SingleImage src={source} alt={alt} className={cName} />;
  };

  return (
    <>
    {/* Browser view */}
    <div className="hidden place-content-center tablet:flex bg-white">
    <ImageSection>
      <div className="gallery">
      {imageArr.length !== 0 && (
        <>
        {imageArr.map((img, i) => {
           return <ImageComponent key={i} source={img.fields.file.url} alt={img.fields.file.filename} cName="image" />

        })}
</>
      )}
      </div>
      </ImageSection>
      <div className="band-wrapper flex flex-col justify-center content-center">
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
      {/* Mobile view */}
    
   {/* <div className="flex relative tablet:hidden">
      <div className="main_bg_white flex flex-col justify-center content-center"></div>
        <h1 className="m-8 mt-16 text-5xl font-extrabold leading-none tracking-tight text-black flex justify-center uppercase absolute z-5 text-center">
        Volunteer at the Castlemaine Jazz Festival{" "}
        </h1>
        <h3 className="justify-center text-center w-full flex text-4xl absolute z-5 top-[24rem] m-8">Apply now to be a volunteer</h3>
        <div className="button-container mb-16 absolute z-5 bottom-[-2rem]">
          <Button.LinkButton
            text="Apply Now"
            link="../support/volunteer"
            classNme="std-button m-4 justify-center content-center"
          />
        </div>
      </div> */}
  </>
  )
}

const SingleImage = styled.img`
  height: 160px;
  width: 200px;
`

const ImageSection = styled.div`
width: 60%;

.gallery {
    --s: 200px; /* control the size */
    --g: 20px;  /* control the gap */
    display: grid;
    margin: calc(var(--s) + var(--g));
}

.gallery > img {
    grid-area: 1/1;
    width: var(--s);
    aspect-ratio: 1.15;
    object-fit: cover;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%,75% 100%,25% 100%,0 50%);
    transform: translate(var(--_x,0),var(--_y,0)) scale(var(--_t,1));
    cursor: pointer;
    filter: grayscale(0);
    transition: .2s linear;
}
.gallery > img:hover {
    filter: grayscale(80%);
    z-index: 1;
    --_t: 1.2;
  }

  .gallery > img:nth-child(1) {--_y: calc(-100% - var(--g))}
  .gallery > img:nth-child(7) {--_y: calc( 100% + var(--g))}
  .gallery > img:nth-child(3),
  .gallery > img:nth-child(5) {--_x: calc(-75% - .87*var(--g))}
  .gallery > img:nth-child(4),
  .gallery > img:nth-child(6) {--_x: calc( 75% + .87*var(--g))}
  .gallery > img:nth-child(3),
  .gallery > img:nth-child(4) {--_y: calc(-50% - .5*var(--g))}
  .gallery > img:nth-child(5), 
  .gallery > img:nth-child(6) {--_y: calc( 50% + .5*var(--g))}

`

export default LandingPageImageSection;