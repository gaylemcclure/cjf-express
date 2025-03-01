import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// function WithHeaderStyledExample() {
//   return (

//   );
// }

// export default WithHeaderStyledExample;

const HeroVideoSectionOverlay = ({ url, buttonLink, hasButton, buttonText, text }) => {
  return (
    <div className="flex">
      <Card className="absolute card-overlay inset-0">
        <Card.Body className="flex flex-col justify-center items-center">
          <h2 className="pb-8">{text}</h2>
          <a className="w-full flex justify-center no-underline" href={buttonLink} target="_blank">
            <Button className="m-0 w-[50%]" variant="primary">
              {buttonText}
            </Button>
          </a>
        </Card.Body>
      </Card>
      <VideoWrapper>
        {url && (
          <video id="my-video" className="video-js tablet:w-screen" muted autoPlay preload="auto" data-setup="{}">
            <source src={url} type="video/mp4" />
            <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a web browser that
              <a href="https://videojs.com/html5-video-support/" target="_blank">
                supports HTML5 video
              </a>
            </p>
          </video>
        )}
      </VideoWrapper>
    </div>
  );
};

const VideoWrapper = styled.div`
  max-width: 100vw;
  width: 100vw;
  @media screen and (max-width: 800px) {
    video {
      height: 450px;
      object-fit: cover;
    }
  }
`;

export default HeroVideoSectionOverlay;
