import styled from "styled-components";

const HeroVideoSection = ({ url }) => {
  return (
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

export default HeroVideoSection;
